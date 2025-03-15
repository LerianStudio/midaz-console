import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PaginationDto } from '../../dto/pagination-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { PortfolioViewResponseDTO } from '../../dto/portfolio-view-dto'
import { AccountMapper } from '../../mappers/account-mapper'
import { inject, injectable } from 'inversify'
import { BalanceRepository } from '@/core/domain/repositories/balance-repository'
import { BalanceMapper } from '../../mappers/balance-mapper'
import { LogOperation } from '../../decorators/log-operation'

export interface FetchAccountsWithPortfolios {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<PortfolioViewResponseDTO>>
}

@injectable()
export class FetchAccountsWithPortfoliosUseCase
  implements FetchAccountsWithPortfolios
{
  constructor(
    @inject(FetchAllPortfoliosRepository)
    private readonly fetchAllPortfoliosRepository: FetchAllPortfoliosRepository,
    @inject(FetchAllAccountsRepository)
    private readonly fetchAllAccountsRepository: FetchAllAccountsRepository,
    @inject(BalanceRepository)
    private readonly balanceRepository: BalanceRepository
  ) {}

  @LogOperation({ layer: 'application' })
  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<PortfolioViewResponseDTO>> {
    const accountsResult: PaginationEntity<AccountEntity> =
      await this.fetchAllAccountsRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page
      )

    const portfoliosResult: PaginationEntity<PortfolioEntity> =
      await this.fetchAllPortfoliosRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page
      )

    const portfolioMap = new Map<string, PortfolioEntity>()
    portfoliosResult.items?.forEach((portfolio) => {
      if (portfolio.id) {
        portfolioMap.set(portfolio.id, portfolio)
      }
    })

    const accountsWithPortfolio: any[] = await Promise.all(
      accountsResult.items.map(async (account) => {
        const portfolio = account.portfolioId
          ? portfolioMap.get(account.portfolioId)
          : null

        const balances = await this.balanceRepository.getByAccountId(
          organizationId,
          ledgerId,
          account.id!
        )

        return {
          ...AccountMapper.toDto({
            ...account,
            ...BalanceMapper.toDomain(balances?.items?.[0])
          }),
          portfolio: portfolio
            ? {
                id: portfolio.id!,
                name: portfolio.name!
              }
            : null
        }
      })
    )

    const responseDTO: PaginationDto<any> = {
      items: accountsWithPortfolio,
      limit: accountsResult.limit,
      page: accountsResult.page
    }

    return responseDTO
  }
}
