import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazCreateLedgerRepository implements CreateLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async create(
    organizationId: string,
    ledger: LedgerEntity
  ): Promise<LedgerEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers`

    const response = await httpMidazAuthFetch<LedgerEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(ledger)
    })

    return response
  }
}
