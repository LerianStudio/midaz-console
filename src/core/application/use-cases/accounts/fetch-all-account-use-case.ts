import { PaginationDto } from '../../dto/pagination-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { accountEntityToDto } from '../../mappers/account-mapper'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { AccountResponseDto } from '../../dto/account-dto'
import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'

export interface FetchAllAccounts {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<AccountResponseDto>>
}

export class FetchAllAccountsUseCase implements FetchAllAccounts {
  constructor(
    private readonly fetchAllAccountsRepository: FetchAllAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<AccountResponseDto>> {
    console.log(
      'Fetching all accounts',
      organizationId,
      ledgerId,
      portfolioId,
      page,
      limit
    )
    const accountsResult: PaginationEntity<AccountEntity> =
      await this.fetchAllAccountsRepository.fetchAll(
        organizationId,
        ledgerId,
        portfolioId,
        page,
        limit
      )

    const { items } = accountsResult

    const accountDto =
      items && items !== null ? items.map(accountEntityToDto) : []

    const accountsResponse: PaginationDto<AccountResponseDto> = {
      items: accountDto,
      limit: accountsResult.limit,
      page: accountsResult.page
    }

    console.log('Accounts response', accountsResponse)

    return accountsResponse
  }
}
