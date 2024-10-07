import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { UpdateLedgerRepository } from '@/core/domain/repositories/ledgers/update-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazUpdateLedgerRepository implements UpdateLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async update(
    organizationId: string,
    ledgerId: string,
    ledger: Partial<LedgerEntity>
  ): Promise<LedgerEntity> {
    const ledgerUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`
    const response = await fetch(ledgerUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ledger)
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazUpdateLedgerRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
