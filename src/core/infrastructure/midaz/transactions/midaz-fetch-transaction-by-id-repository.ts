import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { injectable } from 'inversify'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { FetchTransactionByIdRepository } from '@/core/domain/repositories/transactions/fetch-transaction-by-id-repository'

@injectable()
export class MidazFetchTransactionByIdRepository
  implements FetchTransactionByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    transactionId: string
  ): Promise<TransactionEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions/${transactionId}`

    const response = await httpMidazAuthFetch<TransactionEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    console.log('TEST_AWAIT', response)

    return response
  }
}
