import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazDeleteLedgerRepository implements DeleteLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async delete(organizationId: string, ledgerId: string): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response = await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
