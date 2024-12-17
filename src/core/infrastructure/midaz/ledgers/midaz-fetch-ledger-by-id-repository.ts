import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
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
