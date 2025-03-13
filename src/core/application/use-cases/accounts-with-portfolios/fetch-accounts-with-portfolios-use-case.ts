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

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<PortfolioViewResponseDTO>> {
    try {
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
      try {
        if (!accountsResult?.items?.length) {
          accountsWithPortfolio = []
        } else {
          accountsWithPortfolio = await Promise.all(
            accountsResult.items.map(async (account) => {
              try {
                let portfolio = null
                if (account && account.portfolioId) {
                  portfolio = portfolioMap.get(account.portfolioId) || null
                }

                let balances = null
                try {
                  if (account && account.id) {
                    balances = await this.balanceRepository.getByAccountId(
                      organizationId,
                      ledgerId,
                      account.id
                    )
                  }
                } catch (error) {
                  console.error(`Error fetching balance for account:`, error)
                }

                let balanceData = {}
                try {
                  const balanceItem = balances?.items?.[0]
                  if (balanceItem) {
                    balanceData = BalanceMapper.toDomain(balanceItem)
                  }
                } catch (error) {
                  console.error(`Error mapping balance:`, error)
                }

                const accountDto = AccountMapper.toDto({
                  ...account,
                  ...balanceData
                })

                let portfolioInfo = null
                if (portfolio) {
                  try {
                    portfolioInfo = {
                      id: portfolio.id || '',
                      name: portfolio.name || ''
                    }
                  } catch (error) {
                    console.error(`Error mapping portfolio:`, error)
                  }
                }

                return {
                  ...accountDto,
                  portfolio: portfolioInfo
                }
              } catch (accountError) {
                console.error(
                  `Error processing individual account:`,
                  accountError
                )
                return AccountMapper.toDto(account || {})
              }
            })
          )
        }
      } catch (error) {
        console.error('Error processing accounts with portfolios:', error)
        accountsWithPortfolio = (accountsResult?.items || []).map((account) => {
          try {
            return AccountMapper.toDto(account)
          } catch (e) {
            console.error('Error mapping account:', e)
            return {}
          }
        })
      }

      const responseDTO: PaginationDto<any> = {
        items: accountsWithPortfolio,
        limit: accountsResult?.limit || 0,
        page: accountsResult?.page || 0
      }

      return responseDTO
    } catch (error: any) {
      console.error('Error in fetchAccountsWithPortfolios:', error)
      return {
        items: [],
        limit: 0,
        page: 0
      }
    }
  }
}
