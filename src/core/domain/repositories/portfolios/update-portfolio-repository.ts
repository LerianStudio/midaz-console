import { PortfoliosEntity } from '../../entities/portfolios-entity'

export interface UpdatePortfolioRepository {
  update: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    portfolio: Partial<PortfoliosEntity>
  ) => Promise<PortfoliosEntity>
}
