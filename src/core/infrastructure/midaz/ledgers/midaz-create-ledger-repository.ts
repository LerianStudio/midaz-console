import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { CreateLedgerRepository } from '@/core/domain/repositories/legders/create-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazCreateLedgerRepository implements CreateLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async create(
    organizationId: string,
    ledger: LedgerEntity
  ): Promise<LedgerEntity> {
    const ledgerUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers`

    const response = await fetch(ledgerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ledger)
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
