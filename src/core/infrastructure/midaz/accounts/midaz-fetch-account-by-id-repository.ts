import { AccountEntity } from '@/core/domain/entities/account-entity'
import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { injectable, inject } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { ContainerTypeMidazHttpFetch } from '../../container-registry/midaz-http-fetch-module'

@injectable()
export class MidazFetchAccountByIdRepository
  implements FetchAccountByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(ContainerTypeMidazHttpFetch.MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async fetchById(
    organizationId: string,
    ledgerId: string,
    accountId: string
  ): Promise<AccountEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/accounts/${accountId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<AccountEntity>({
        url,
        method: HTTP_METHODS.GET
      })

    return response
  }
}
