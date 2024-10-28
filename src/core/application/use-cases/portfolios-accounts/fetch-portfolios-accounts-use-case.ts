import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { PaginationDto } from '../../dto/pagination-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { accountEntityToDto } from '../../mappers/account-mapper'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { PortfolioViewResponseDTO } from '../../dto/portfolio-view-dto'

export interface FetchAllPortfoliosAccounts {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<PortfolioViewResponseDTO>>
}

export class FetchAllPortfoliosAccountsUseCase
  implements FetchAllPortfoliosAccounts
{
  constructor(
    private readonly fetchAllPortfoliosRepository: FetchAllPortfoliosRepository,
    private readonly fetchAllAccountsRepository: FetchAllAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<PortfolioViewResponseDTO>> {
    const portfoliosResult: PaginationEntity<PortfolioEntity> =
      await this.fetchAllPortfoliosRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page
      )

    let portfoliosAccountResponseDTO: PaginationDto<PortfolioViewResponseDTO> =
      {
        items: [],
        limit: portfoliosResult.limit,
        page: portfoliosResult.page
      }

    const portfolioItems = portfoliosResult.items || []

    portfoliosAccountResponseDTO.items = await Promise.all(
      portfolioItems.map(async (portfolio) => {
        const accountsResult: PaginationEntity<AccountEntity> =
          await this.fetchAllAccountsRepository.fetchAll(
            organizationId,
            ledgerId,
            portfolio.id!,
            limit,
            page
          )

        const portfolioAccounts: PortfolioViewResponseDTO = {
          id: portfolio.id!,
          ledgerId: portfolio.ledgerId!,
          organizationId: portfolio.organizationId!,
          name: portfolio.name!,
          status: {
            code: portfolio.status!.code!,
            description: portfolio.status!.description!
          },
          metadata: portfolio.metadata!,
          createdAt: portfolio.createdAt!,
          updatedAt: portfolio.updatedAt!,
          deletedAt: portfolio.deletedAt!,
          accounts: accountsResult.items
            ? accountsResult.items.map(accountEntityToDto)
            : []
        }

        return portfolioAccounts
      })
    )

    return portfoliosAccountResponseDTO
  }
}
