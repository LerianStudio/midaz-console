import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { UpdateLedgerRepository } from '@/core/domain/repositories/ledgers/update-ledger-repository'
import { injectable } from 'inversify'
import { inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazUpdateLedgerRepository implements UpdateLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
     @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async update(
    organizationId: string,
    ledgerId: string,
    ledger: Partial<LedgerEntity>
  ): Promise<LedgerEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<LedgerEntity>({
        url,
        method: HTTP_METHODS.PATCH,
        body: JSON.stringify(ledger)
      })

    return response
  }
}
