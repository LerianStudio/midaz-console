import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazFetchLedgerByIdRepository
  implements FetchLedgerByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string
  ): Promise<LedgerEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response = await httpMidazAuthFetch<LedgerEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
