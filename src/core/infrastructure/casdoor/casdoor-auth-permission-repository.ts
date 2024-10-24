import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'
import { AuthPermissionResponseDto } from '@/core/application/dto/auth-dto'
import { SDK } from 'casdoor-nodejs-sdk'
import {
  batchEnforceResponseToDto,
  filterBatchEnforceResponse,
  permissionToCasbinRequest
} from '@/core/application/mappers/permission-mapper'
import { casdoorSdkConfig } from '../next-auth/casdoor/casdoor-sdk-config'

export class CasdoorAuthPermissionRepository
  implements AuthPermissionRepository
{
  private readonly casdoorSdk: SDK = new SDK(casdoorSdkConfig)

  private readonly casdoorModelName: string = `${process.env.CASDOOR_ORGANIZATION_NAME}/${process.env.CASDOOR_MODEL_NAME}`

  async getAuthPermissions({
    username
  }: {
    username: string
  }): Promise<AuthPermissionResponseDto> {
    // Fetchs all permissions from Casdoor
    const { data: permissionsData } = await this.casdoorSdk.getPermissions()

    // Parses the permissions to a format that Casdoor SDK can understand
    const batchEnforcePayload = permissionToCasbinRequest(
      `${process.env.CASDOOR_ORGANIZATION_NAME as string}/${username}`,
      permissionsData.data
    )

    // Calls Casdoor SDK to validate the permissions
    const batchEnforceData = await this.casdoorSdk.batchEnforce(
      '',
      this.casdoorModelName,
      '',
      batchEnforcePayload
    )

    // Filters the permissions that are allowed
    const batchEnforceFiltered = filterBatchEnforceResponse(
      batchEnforceData,
      batchEnforcePayload
    )

    // Parses these permissions to return to the client
    const result = batchEnforceResponseToDto(batchEnforceFiltered)

    return result
  }
}
