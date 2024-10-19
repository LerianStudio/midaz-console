import { DeletePortfolioRepository } from '@/core/domain/repositories/portfolios/delete-portfolio-repository'

export interface DeletePortfolio {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ) => Promise<void>
}

export class DeletePortfolioUseCase implements DeletePortfolio {
  constructor(
    private readonly deletePortfolioRepository: DeletePortfolioRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<void> {
    await this.deletePortfolioRepository.delete(
      organizationId,
      ledgerId,
      portfolioId
    )
  }
}
