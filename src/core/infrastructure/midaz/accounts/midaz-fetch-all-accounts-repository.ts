import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { AccountEntity } from '@/core/domain/entities/account-entity'

export class MidazFetchAllAccountsRepository
  implements FetchAllAccountsRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<AccountEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts?limit=${limit}&page=${page}`

    const response = await httpMidazAuthFetch<PaginationEntity<AccountEntity>>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
