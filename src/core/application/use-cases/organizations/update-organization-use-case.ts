import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { UpdateOrganizationDto } from '../../dto/update-organization-dto'
import { OrganizationMapper } from '../../mappers/organization-mapper'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import { inject, injectable } from 'inversify'
import { CreateOrganizationDto } from '../../dto/create-organization-dto'

export interface UpdateOrganization {
  execute: (
    organizationId: string,
    organization: Partial<UpdateOrganizationDto>
  ) => Promise<OrganizationResponseDto>
}

@injectable()
export class UpdateOrganizationUseCase implements UpdateOrganization {
  constructor(
    @inject(UpdateOrganizationRepository)
    private readonly updateOrganizationRepository: UpdateOrganizationRepository
  ) {}

  async execute(
    organizationId: string,
    organization: Partial<UpdateOrganizationDto>
  ): Promise<OrganizationResponseDto> {
    const organizationEntity: Partial<OrganizationEntity> =
      OrganizationMapper.toDomain(organization as CreateOrganizationDto)

    const updatedOrganizationEntity =
      await this.updateOrganizationRepository.updateOrganization(
        organizationId,
        organizationEntity
      )

    return OrganizationMapper.toResponseDto(updatedOrganizationEntity)
  }
}
