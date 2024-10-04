import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/legders/fetch-all-ledgers-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchAllLedgersRepository
  implements FetchAllLedgersRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<LedgerEntity>> {
    const ledgerUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers?limit=${limit}&page=${page}`

    const response = await fetch(ledgerUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAllLedgersRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
