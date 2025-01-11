import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { injectable } from 'inversify'
import { inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazDeleteLedgerRepository implements DeleteLedgerRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
     @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async delete(organizationId: string, ledgerId: string): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

    const response = await this.midazHttpFetchUtils.httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
