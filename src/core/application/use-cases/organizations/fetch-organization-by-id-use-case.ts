import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { organizationEntityToDto } from '../../mappers/organization-mapper'
import { inject, injectable } from 'inversify'

export interface FetchOrganizationById {
  execute: (organizationId: string) => Promise<OrganizationResponseDto>
}

@injectable()
export class FetchOrganizationByIdUseCase implements FetchOrganizationById {
  constructor(
    @inject(FetchOrganizationByIdRepository)
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
