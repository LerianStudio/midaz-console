import { OrganizationEntity } from '../../entities/organization-entity'
import { PaginationEntity } from '../../entities/pagination-entity'

export interface FetchAllOrganizationsRepository {
  fetchAll: (
    limit: number,
    page: number
  ) => Promise<PaginationEntity<OrganizationEntity>>
}
