import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { CreateOrganizationDto } from '../../dto/create-organization-dto'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import {
  organizationDtoToEntity,
  organizationEntityToDto
} from '../../mappers/organization-mapper'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'

export interface CreateOrganization {
  execute: (
    organization: CreateOrganizationDto
  ) => Promise<OrganizationResponseDto>
}

export class CreateOrganizationUseCase implements CreateOrganization {
  constructor(
    private readonly createOrganizationRepository: CreateOrganizationRepository
  ) {}

  async execute(
    organizationData: CreateOrganizationDto
  ): Promise<OrganizationResponseDto> {
    try {
      const organizationEntity: OrganizationEntity =
        organizationDtoToEntity(organizationData)

      const organizationCreated =
        await this.createOrganizationRepository.create(organizationEntity)

      return organizationEntityToDto(organizationCreated)
    } catch (error: unknown) {
      if (error instanceof MidazError) {
        throw error
      }

      throw new Error('Error creating organization Use Case')
    }
  }
}
