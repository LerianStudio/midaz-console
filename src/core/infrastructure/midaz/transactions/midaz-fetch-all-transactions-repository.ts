import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'
import { FetchAllTransactionsRepository } from '@/core/domain/repositories/transactions/fetch-all-transactions-repository'
import { TransactionEntity } from '@/core/domain/entities/transaction-entity'

@injectable()
export class MidazFetchAllTransactionsRepository
  implements FetchAllTransactionsRepository
{
  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<TransactionEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions?limit=${limit}&page=${page}`

    const response = await httpMidazAuthFetch<
      PaginationEntity<TransactionEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
