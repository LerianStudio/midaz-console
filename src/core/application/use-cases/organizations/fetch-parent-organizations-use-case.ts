import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { organizationEntityToDto } from '../../mappers/oganization-mapper'

export interface FetchParentOrganizations {
  execute(organizationId?: string): Promise<OrganizationResponseDto[]>
}

export class FetchParentOrganizationsUseCase
  implements FetchParentOrganizations
{
  constructor(
    private readonly fetchAllOrganizationsRepository: FetchAllOrganizationsRepository
  ) {}

  async execute(organizationId?: string): Promise<OrganizationResponseDto[]> {
    const organizations = await this.fetchAllOrganizationsRepository.fetchAll(
      100,
      1
    )

    const parentOrganizationsFiltered = organizations.items.filter(
      (organization) => organization.id !== organizationId
    )

    const parentOrganizations: OrganizationResponseDto[] =
      parentOrganizationsFiltered.map(organizationEntityToDto)

    return parentOrganizations
  }
}
