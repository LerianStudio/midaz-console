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
import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { LogOperation } from '@/core/application/decorators/log-operation'

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
    private readonly balanceRepository: BalanceRepository,
    @inject(LoggerAggregator)
    private readonly midazLogger: LoggerAggregator
  ) {}

  @LogOperation({
    layer: 'application'
  })
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
    if (portfoliosResult?.items) {
      portfoliosResult.items.forEach((portfolio) => {
        if (portfolio && portfolio.id) {
          portfolioMap.set(portfolio.id, portfolio)
        }
      })
    }

    let accountsWithPortfolio: any[] = []

    if (!accountsResult?.items?.length) {
      accountsWithPortfolio = []
    } else {
      accountsWithPortfolio = await Promise.all(
        accountsResult.items.map(async (account) => {
          const portfolio = account?.portfolioId
            ? portfolioMap.get(account.portfolioId) || null
            : null

          let balances = null
          let balanceData = {}

          if (account?.id) {
            try {
              balances = await this.balanceRepository.getByAccountId(
                organizationId,
                ledgerId,
                account.id
              )

              const balanceItem = balances?.items?.[0]
              if (balanceItem) {
                balanceData = BalanceMapper.toDomain(balanceItem)
              }
            } catch (error) {
              this.midazLogger.error({
                layer: 'application',
                operation: 'fetch_account_balance_failed',
                message: 'Error processing balance data for account',
                error,
                context: {
                  accountId: account?.id,
                  organizationId,
                  ledgerId
                }
              })
            }
          }

          const accountDto = AccountMapper.toDto({
            ...account,
            ...balanceData
          })

          let portfolioInfo = null
          if (portfolio) {
            portfolioInfo = {
              id: portfolio.id || '',
              name: portfolio.name || ''
            }
          }

          return {
            ...accountDto,
            portfolio: portfolioInfo
          }
        })
      )
    }

    return {
      items: accountsWithPortfolio,
      limit: accountsResult?.limit || 0,
      page: accountsResult?.page || 0
    }
  }
}
