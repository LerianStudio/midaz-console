import { UpdatePortfolioRepository } from '@/core/domain/repositories/portfolios/update-portfolio-repository'
import {
  portfolioEntityToDto,
  portfolioUpdateDtoToEntity
} from '../../mappers/portfolio-mapper'
import {
  PortfolioResponseDto,
  UpdatePortfolioDto
} from '../../dto/portfolios-dto'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

export interface UpdatePortfolio {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    portfolio: Partial<UpdatePortfolioDto>
  ) => Promise<PortfolioResponseDto>
}

export class UpdatePortfolioUseCase implements UpdatePortfolio {
  constructor(
    private readonly updatePortfolioRepository: UpdatePortfolioRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    portfolio: Partial<UpdatePortfolioDto>
  ): Promise<PortfolioResponseDto> {
    portfolio.status = {
      code: 'ACTIVE',
      description: 'Teste Portfolio'
    }
    const portfolioEntity: Partial<PortfolioEntity> =
      portfolioUpdateDtoToEntity(portfolio)
    const updatedPortfolio: PortfolioEntity =
      await this.updatePortfolioRepository.update(
        organizationId,
        ledgerId,
        portfolioId,
        portfolioEntity
      )

    const portfolioResponseDto: PortfolioResponseDto =
      portfolioEntityToDto(updatedPortfolio)

    return portfolioResponseDto
  }
}
