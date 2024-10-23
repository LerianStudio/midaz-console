import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { CreateAccountsRepository } from '@/core/domain/repositories/accounts/create-accounts-repository'

export class MidazCreateAccountRepository implements CreateAccountsRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    account: AccountEntity
  ): Promise<AccountEntity> {
    console.log('MidazCreateAccountRepository', account)
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts`

    const response = await httpMidazAuthFetch<AccountEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(account)
    })

    return response
  }
}
