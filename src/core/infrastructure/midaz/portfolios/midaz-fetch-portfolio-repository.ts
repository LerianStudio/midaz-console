import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'

export class FetchAllPortfoliosUseCase {
  constructor(private readonly repository: FetchAllPortfoliosRepository) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<PortfoliosEntity>> {
    return this.repository.fetchAll(organizationId, ledgerId, limit, page)
  }
}

export type FetchAllPortfolios = (
  organizationId: string,
  ledgerId: string,
  limit: number,
  page: number
) => Promise<PaginationEntity<PortfoliosEntity>>
