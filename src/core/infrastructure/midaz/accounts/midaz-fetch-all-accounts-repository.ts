import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { injectable, inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils } from '../../utils/http-fetch-utils'

@injectable()
export class MidazFetchAllAccountsRepository
  implements FetchAllAccountsRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(new LazyServiceIdentifier(() => MidazHttpFetchUtils))
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<AccountEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/accounts?limit=${limit}&page=${page}`

    const response = await this.midazHttpFetchUtils.httpMidazAuthFetch<
      PaginationEntity<AccountEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
