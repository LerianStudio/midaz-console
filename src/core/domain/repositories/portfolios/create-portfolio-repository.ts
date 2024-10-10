import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

export interface CreatePortfolioRepository {
  create: (
    organizationId: string,
    ledgerId: string,
    product: PortfoliosEntity
  ) => Promise<PortfoliosEntity>
}
