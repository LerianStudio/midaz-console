import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { CreateTransactionRepository } from '@/core/domain/repositories/transactions/create-transaction-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazCreateTransactionRepository
  implements CreateTransactionRepository
{
  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    transaction: TransactionEntity
  ) {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions/json`

    const response = await httpMidazAuthFetch<TransactionEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(transaction)
    })

    return response
  }
}
