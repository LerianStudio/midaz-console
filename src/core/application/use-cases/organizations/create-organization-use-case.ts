import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import type { CreateOrganizationDto } from '../../dto/create-organization-dto'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { OrganizationMapper } from '../../mappers/organization-mapper'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface CreateOrganization {
  execute: (
    organization: CreateOrganizationDto
  ) => Promise<OrganizationResponseDto>
}

@injectable()
export class CreateOrganizationUseCase implements CreateOrganization {
  constructor(
    @inject(CreateOrganizationRepository)
    private readonly createOrganizationRepository: CreateOrganizationRepository
  ) {}

  @LogOperation({ layer: 'application' })
  async execute(
    organizationData: CreateOrganizationDto
  ): Promise<OrganizationResponseDto> {
    try {
      const organizationEntity: OrganizationEntity =
        OrganizationMapper.toDomain(organizationData)

      const organizationCreated =
        await this.createOrganizationRepository.create(organizationEntity)

      return OrganizationMapper.toResponseDto(organizationCreated)
    } catch (error: unknown) {
      if (error instanceof MidazError) {
        throw error
      }

      throw new Error('Error creating organization Use Case')
    }
  }
}
