import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

export abstract class CreatePortfolioRepository {
  abstract create: (
    organizationId: string,
    ledgerId: string,
    midazId: string,
    product: PortfolioEntity
  ) => Promise<PortfolioEntity>
}
