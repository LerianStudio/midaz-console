import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import {
  portfolioDtoToEntity,
  portfolioEntityToDto
} from '../../mappers/portfolio-mapper'
import {
  CreatePortfolioDto,
  PortfolioResponseDto
} from '../../dto/portfolios-dto'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

export interface CreatePortfolio {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolio: CreatePortfolioDto
  ) => Promise<PortfolioResponseDto>
}

export class CreatePortfolioUseCase implements CreatePortfolio {
  constructor(
    private readonly createPortfolioRepository: CreatePortfolioRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolio: CreatePortfolioDto
  ): Promise<PortfolioResponseDto> {
    console.log('use cases create', organizationId, ledgerId, portfolio)
    portfolio.status = {
      code: 'ACTIVE',
      description: 'Teste Portfolio'
    }
    portfolio.metadata = {}
    const portfolioEntity: PortfoliosEntity = portfolioDtoToEntity(portfolio)
    const portfolioCreated = await this.createPortfolioRepository.create(
      organizationId,
      ledgerId,
      portfolioEntity
    )

    console.log('portfolioCreated', portfolioCreated)

    const portfolioResponseDto: PortfolioResponseDto =
      portfolioEntityToDto(portfolioCreated)

    console.log('portfolioResponseDto', portfolioResponseDto)

    return portfolioResponseDto
  }
}
