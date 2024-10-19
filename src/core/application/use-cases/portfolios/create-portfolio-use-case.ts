import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import {
  portfolioDtoToEntity,
  portfolioEntityToDto
} from '../../mappers/portfolio-mapper'
import {
  CreatePortfolioDto,
  PortfolioResponseDto
} from '../../dto/portfolios-dto'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

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
    portfolio.status = {
      code: 'ACTIVE',
      description: 'Teste Portfolio'
    }
    const portfolioEntity: PortfolioEntity = portfolioDtoToEntity(portfolio)
    const portfolioCreated = await this.createPortfolioRepository.create(
      organizationId,
      ledgerId,
      portfolioEntity
    )

    const portfolioResponseDto: PortfolioResponseDto =
      portfolioEntityToDto(portfolioCreated)

    return portfolioResponseDto
  }
}
