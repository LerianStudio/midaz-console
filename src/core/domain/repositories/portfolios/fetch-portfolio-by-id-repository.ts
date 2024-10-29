import { PortfolioEntity } from '../../entities/portfolios-entity'

export interface FetchPortfolioByIdRepository {
  fetchById: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ) => Promise<PortfolioEntity>
}
