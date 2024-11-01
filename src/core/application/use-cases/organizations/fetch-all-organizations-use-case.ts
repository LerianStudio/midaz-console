import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { organizationEntityToDto } from '../../mappers/organization-mapper'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PaginationDto } from '../../dto/pagination-dto'

export interface FetchAllOrganizations {
  execute: (
    limit: number,
    page: number
  ) => Promise<PaginationDto<OrganizationResponseDto>>
}

export class FetchAllOrganizationsUseCase implements FetchAllOrganizations {
  constructor(
    private readonly fetchAllOrganizationsRepository: FetchAllOrganizationsRepository
  ) {}

  async execute(
    limit: number,
    page: number
  ): Promise<PaginationDto<OrganizationResponseDto>> {
    const organizationsResult: PaginationEntity<OrganizationEntity> =
      await this.fetchAllOrganizationsRepository.fetchAll(limit, page)

    const { items } = organizationsResult

    const organizationDto =
      items && items !== null ? items.map(organizationEntityToDto) : []

    const organizationsResponse: PaginationDto<OrganizationResponseDto> = {
      items: organizationDto,
      limit: organizationsResult.limit,
      page: organizationsResult.page
    }

    return organizationsResponse
  }
}
