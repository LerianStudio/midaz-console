import { AccountEntity } from '@/core/domain/entities/account-entity'
import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazFetchAccountByIdRepository
  implements FetchAccountByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ): Promise<AccountEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts/${accountId}`

    const response = await httpMidazAuthFetch<AccountEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
