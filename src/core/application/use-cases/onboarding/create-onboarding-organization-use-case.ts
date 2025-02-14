import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { CreateOrganizationDto } from '../../dto/create-organization-dto'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { OrganizationMapper } from '../../mappers/organization-mapper'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { inject, injectable } from 'inversify'

export interface CreateOnboardingOrganization {
  execute: (
    organization: CreateOrganizationDto
  ) => Promise<OrganizationResponseDto>
}

@injectable()
export class CreateOnboardingOrganizationUseCase
  implements CreateOnboardingOrganization
{
  constructor(
    @inject(CreateOrganizationRepository)
    private readonly createOrganizationRepository: CreateOrganizationRepository
  ) {}

  async execute(
    organizationData: CreateOrganizationDto
  ): Promise<OrganizationResponseDto> {
    try {
      const organizationEntity: OrganizationEntity =
        OrganizationMapper.toDomain({
          ...organizationData,
          metadata: {
            ...organizationData.metadata,
            onboarding: true
          }
        })

      const organizationCreated =
        await this.createOrganizationRepository.create(organizationEntity)

      return OrganizationMapper.toResponseDto(organizationCreated)
    } catch (error: unknown) {
      if (error instanceof MidazError) {
        throw error
      }

      throw new Error('Error creating onboarding organization Use Case')
    }
  }
}
