import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { FetchTransactionByIdRepository } from '@/core/domain/repositories/transactions/fetch-transaction-by-id-repository'
import { inject, injectable } from 'inversify'
import { ContainerTypeMidazHttpFetch } from '../../container-registry/midaz-http-fetch-module'
import { HTTP_METHODS, MidazHttpFetchUtils } from '../../utils/http-fetch-utils'

@injectable()
export class MidazFetchTransactionByIdRepository
  implements FetchTransactionByIdRepository
{
  constructor(
    @inject(ContainerTypeMidazHttpFetch.MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    transactionId: string
  ): Promise<TransactionEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions/${transactionId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<TransactionEntity>({
        url,
        method: HTTP_METHODS.GET
      })

    return response
  }
}
