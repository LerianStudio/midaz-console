import { FetchPortfolioByIdRepository } from '@/core/domain/repositories/portfolios/fetch-portfolio-by-id-repository'
import { portfolioEntityToDto } from '../../mappers/portfolio-mapper'
import { PortfolioResponseDto } from '../../dto/portfolios-dto'

export interface FetchPortfolioById {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ) => Promise<PortfolioResponseDto>
}

export class FetchPortfolioByIdUseCase implements FetchPortfolioById {
  constructor(
    private readonly fetchPortfolioByIdRepository: FetchPortfolioByIdRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<PortfolioResponseDto> {
    const portfolio = await this.fetchPortfolioByIdRepository.fetchById(
      organizationId,
      ledgerId,
      portfolioId
    )

    const portfolioResponseDto: PortfolioResponseDto =
      portfolioEntityToDto(portfolio)

    return portfolioResponseDto
  }
}
