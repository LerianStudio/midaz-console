import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import {
  httpMidazAuthFetch,
  HTTP_METHODS,
  MidazHttpFetchUtils
} from '../../utils/http-fetch-utils'
import { inject, injectable } from 'inversify'
import { FetchAllTransactionsRepository } from '@/core/domain/repositories/transactions/fetch-all-transactions-repository'
import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { ContainerTypeMidazHttpFetch } from '../../container-registry/midaz-http-fetch-module'

@injectable()
export class MidazFetchAllTransactionsRepository
  implements FetchAllTransactionsRepository
{
  constructor(
    @inject(ContainerTypeMidazHttpFetch.MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<TransactionEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions?limit=${limit}&page=${page}`

    const response = await this.midazHttpFetchUtils.httpMidazAuthFetch<
      PaginationEntity<TransactionEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
