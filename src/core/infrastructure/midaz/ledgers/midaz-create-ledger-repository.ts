import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import { injectable } from 'inversify'
import { inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazCreateLedgerRepository implements CreateLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(new LazyServiceIdentifier(() => MidazHttpFetchUtils))
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async create(
    organizationId: string,
    ledger: LedgerEntity
  ): Promise<LedgerEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<LedgerEntity>({
        url,
        method: HTTP_METHODS.POST,
        body: JSON.stringify(ledger)
      })

    return response
  }
}
