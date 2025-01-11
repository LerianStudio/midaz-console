import { UpdateAccountsRepository } from '@/core/domain/repositories/accounts/update-accounts-repository'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { injectable, inject } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazUpdateAccountsRepository implements UpdateAccountsRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async update(
    organizationId: string,
    ledgerId: string,
    accountId: string,
    account: Partial<AccountEntity>
  ): Promise<AccountEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/accounts/${accountId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<AccountEntity>({
        url,
        method: HTTP_METHODS.PATCH,
        body: JSON.stringify(account)
      })

    return response
  }
}
