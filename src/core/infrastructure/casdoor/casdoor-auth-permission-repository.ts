import { injectable } from 'inversify'
import { casdoorSdkConfig } from '../next-auth/casdoor/casdoor-sdk-config'
import { CasdoorSdk } from './service/casdoor-sdk'
import { BatchEnforceDto, BatchEnforceResponseDto } from './dto/batch-enforce'
import { BatchEnforceMapper } from './mappers/batch-enforce-mapper'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'
import { AuthPermissionEntity } from '@/core/domain/entities/auth-permission-entity'

@injectable()
export class CasdoorAuthPermissionRepository
  implements AuthPermissionRepository
{
  private readonly casdoorSdk: CasdoorSdk = new CasdoorSdk(casdoorSdkConfig)

  private readonly casdoorModelName: string = `${process.env.NEXTAUTH_CASDOOR_ORGANIZATION_NAME}/${process.env.NEXTAUTH_CASDOOR_MODEL_NAME}`

  async getPermissions(username: string): Promise<AuthPermissionEntity> {
    // Fetchs all permissions from Casdoor
    const { data: permissionsData } = await this.casdoorSdk.getPermissions()

    // Parses the permissions to a format that Casdoor SDK can understand
    const batchEnforceDto = BatchEnforceMapper.toDto(
      `${process.env.NEXTAUTH_CASDOOR_ORGANIZATION_NAME as string}/${username}`,
      permissionsData
    )

    // Calls Casdoor SDK to validate the permissions
    const batchEnforceData = await this.casdoorSdk.batchEnforce(
      '',
      this.casdoorModelName,
      '',
      batchEnforceDto
    )

    // Filters the permissions that are allowed
    const batchEnforceFiltered = this.filterBatchEnforceResponse(
      batchEnforceData,
      batchEnforceDto
    )

    // Parses these permissions to return to the client
    return BatchEnforceMapper.toResponseDto(batchEnforceFiltered)
  }

  private filterBatchEnforceResponse(
    validation: BatchEnforceResponseDto,
    data: BatchEnforceDto
  ) {
    return validation
      .flat()
      ?.reduce<BatchEnforceDto>(
        (sum, result, i) => (result ? [...sum, data[i]] : sum),
        []
      )
  }
}
