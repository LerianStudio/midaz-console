import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

export interface CreatePortfolioRepository {
  create: (
    organizationId: string,
    ledgerId: string,
    product: PortfolioEntity
  ) => Promise<PortfolioEntity>
}
