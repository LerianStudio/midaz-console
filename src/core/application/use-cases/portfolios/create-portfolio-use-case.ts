import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import {
  portfolioDtoToEntity,
  portfolioEntityToDto
} from '../../mappers/portfolio-mapper'
import type {
  CreatePortfolioDto,
  PortfolioResponseDto
} from '../../dto/portfolios-dto'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface CreatePortfolio {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolio: CreatePortfolioDto
  ) => Promise<PortfolioResponseDto>
}

@injectable()
export class CreatePortfolioUseCase implements CreatePortfolio {
  constructor(
    @inject(CreatePortfolioRepository)
    private readonly createPortfolioRepository: CreatePortfolioRepository
  ) {}

  @LogOperation({
    layer: 'application',
    operation: 'create_portfolio'
  })
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
