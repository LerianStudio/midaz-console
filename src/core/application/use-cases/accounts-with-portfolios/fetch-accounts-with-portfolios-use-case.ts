import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PaginationDto } from '../../dto/pagination-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { PortfolioViewResponseDTO } from '../../dto/portfolio-view-dto'
import { AccountMapper } from '../../mappers/account-mapper'
import { inject, injectable } from 'inversify'

export interface FetchAllAccountsWithPortfolios {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<PortfolioViewResponseDTO>>
}

@injectable()
export class FetchAllAccountsWithPortfoliosUseCase
  implements FetchAllAccountsWithPortfolios
{
  constructor(
    @inject(FetchAllPortfoliosRepository)
    private readonly fetchAllPortfoliosRepository: FetchAllPortfoliosRepository,
    @inject(FetchAllAccountsRepository)
    private readonly fetchAllAccountsRepository: FetchAllAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<PortfolioViewResponseDTO>> {
    // Fetch all accounts
    const accountsResult: PaginationEntity<AccountEntity> =
      await this.fetchAllAccountsRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page
      )

    // Fetch all portfolios
    const portfoliosResult: PaginationEntity<PortfolioEntity> =
      await this.fetchAllPortfoliosRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page
      )

    // Create a map of portfolio IDs to PortfolioEntity
    const portfolioMap = new Map<string, PortfolioEntity>()
    portfoliosResult.items.forEach((portfolio) => {
      if (portfolio.id) {
        portfolioMap.set(portfolio.id, portfolio)
      }
    })

    // Map accounts to include portfolio information
    const accountsWithPortfolio: any[] = accountsResult.items.map((account) => {
      const portfolio = account.portfolioId
        ? portfolioMap.get(account.portfolioId)
        : null

      return {
        ...AccountMapper.toDto(account),
        portfolio: portfolio
          ? {
              id: portfolio.id!,
              name: portfolio.name!
            }
          : null
      }
    })

    // Prepare the response DTO
    const responseDTO: PaginationDto<any> = {
      items: accountsWithPortfolio,
      limit: accountsResult.limit,
      page: accountsResult.page
    }

    return responseDTO
  }
}
