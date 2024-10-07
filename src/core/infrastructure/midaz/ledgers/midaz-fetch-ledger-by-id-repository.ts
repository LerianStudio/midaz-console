import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchLedgerByIdRepository
  implements FetchLedgerByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string
  ): Promise<LedgerEntity> {
    const ledgerUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response = await fetch(ledgerUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('midazResponse', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
