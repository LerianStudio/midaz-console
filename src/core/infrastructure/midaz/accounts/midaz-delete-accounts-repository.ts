import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { DeleteAccountsRepository } from '@/core/domain/repositories/accounts/delete-accounts-repository'

export class MidazDeleteAccountsRepository implements DeleteAccountsRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ): Promise<void> {
    console.log('MidazDeleteAccountsRepository', organizationId)
    console.log('MidazDeleteAccountsRepository', ledgerId)
    console.log('MidazDeleteAccountsRepository', portfolioId)
    console.log('MidazDeleteAccountsRepository', accountId)

    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}/accounts/${accountId}`
    console.log('MidazDeleteAccountsRepository url', url)
    await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
