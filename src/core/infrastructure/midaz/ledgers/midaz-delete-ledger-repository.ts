import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazDeleteLedgerRepository implements DeleteLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async delete(organizationId: string, ledgerId: string): Promise<void> {
    const ledgerUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response = await fetch(ledgerUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazDeleteLedgerRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
