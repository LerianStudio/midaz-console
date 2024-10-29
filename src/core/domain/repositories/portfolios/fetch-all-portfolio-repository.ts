import { PaginationEntity } from '../../entities/pagination-entity'
import { PortfolioEntity } from '../../entities/portfolios-entity'

export interface FetchAllPortfoliosRepository {
  fetchAll: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationEntity<PortfolioEntity>>
}
