import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/ledgers/fetch-all-ledgers-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazFetchAllLedgersRepository
  implements FetchAllLedgersRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<LedgerEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers?limit=${limit}&page=${page}`

    const response = await httpMidazAuthFetch({
      url,
      method: HTTP_METHODS.GET
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
