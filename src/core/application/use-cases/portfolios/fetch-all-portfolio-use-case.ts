import { PaginationDto } from '../../dto/pagination-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { portfolioEntityToDto } from '../../mappers/portfolio-mapper'
import { PortfolioResponseDto } from '../../dto/portfolios-dto'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'

export interface FetchAllPortfolios {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<PortfolioResponseDto>>
}

export class FetchAllPortfoliosUseCase implements FetchAllPortfolios {
  constructor(
    private readonly fetchAllPortfoliosRepository: FetchAllPortfoliosRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<PortfolioResponseDto>> {
    const portfoliosResult: PaginationEntity<PortfoliosEntity> =
      await this.fetchAllPortfoliosRepository.fetchAll(
        organizationId,
        ledgerId,
        page,
        limit
      )

    const { items } = portfoliosResult

    const portfolioDto =
      items && items !== null ? items.map(portfolioEntityToDto) : []

    const portfoliosResponse: PaginationDto<PortfolioResponseDto> = {
      items: portfolioDto,
      limit: portfoliosResult.limit,
      page: portfoliosResult.page
    }

    return portfoliosResponse
  }
}
