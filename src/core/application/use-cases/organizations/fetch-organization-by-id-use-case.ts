import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { organizationEntityToDto } from '../../mappers/organization-mapper'

export interface FetchOrganizationById {
  execute: (organizationId: string) => Promise<OrganizationResponseDto>
}

export class FetchOrganizationByIdUseCase implements FetchOrganizationById {
  constructor(
    private readonly fetchOrganizationByIdRepository: FetchOrganizationByIdRepository
  ) {}

  async execute(organizationId: string): Promise<OrganizationResponseDto> {
    const organizationEntity =
      await this.fetchOrganizationByIdRepository.fetchById(organizationId)

    const organizationResponse: OrganizationResponseDto =
      organizationEntityToDto(organizationEntity)

    return organizationResponse
  }
}
