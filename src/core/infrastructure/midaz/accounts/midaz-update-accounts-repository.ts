import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { UpdateAccountsRepository } from '@/core/domain/repositories/accounts/update-accounts-repository'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { injectable } from 'inversify'

@injectable()
export class MidazUpdateAccountsRepository implements UpdateAccountsRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async update(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string,
    account: Partial<AccountEntity>
  ): Promise<AccountEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts/${accountId}`

    const response = await httpMidazAuthFetch<AccountEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(account)
    })

    return response
  }
}
