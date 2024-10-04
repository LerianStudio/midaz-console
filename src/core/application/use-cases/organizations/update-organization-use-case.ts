import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { UpdateOrganizationDto } from '../../dto/update-organization-dto'
import {
  organizationEntityToDto,
  organizationUpdateDtoToEntity
} from '../../mappers/oganization-mapper'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'

export interface UpdateOrganization {
  execute: (
    organizationId: string,
    organization: Partial<UpdateOrganizationDto>
  ) => Promise<OrganizationResponseDto>
}

export class UpdateOrganizationUseCase implements UpdateOrganization {
  constructor(
    private readonly updateOrganizationRepository: UpdateOrganizationRepository
  ) {}

  async execute(
    organizationId: string,
    organization: Partial<UpdateOrganizationDto>
  ): Promise<OrganizationResponseDto> {
    const organizationEntity: Partial<OrganizationEntity> =
      organizationUpdateDtoToEntity(organization)

    const updatedOrganizationEntity =
      await this.updateOrganizationRepository.updateOrganization(
        organizationId,
        organizationEntity
      )

    const organizationResponseDto: OrganizationResponseDto =
      organizationEntityToDto(updatedOrganizationEntity)

    return organizationResponseDto
  }
}
