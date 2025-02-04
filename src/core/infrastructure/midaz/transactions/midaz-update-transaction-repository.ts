import { UpdateTransactionRepository } from '@/core/domain/repositories/transactions/update-transaction-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { injectable } from 'inversify'

@injectable()
export class MidazUpdateTransactionRepository
  implements UpdateTransactionRepository
{
  private baseUrl: string = process.env.MIDAZ_TRANSACTION_BASE_PATH as string
  async update(
    organizationId: string,
    ledgerId: string,
    transactionId: string,
    transaction: Partial<TransactionEntity>
  ): Promise<TransactionEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/transactions/${transactionId}`

    const response = await httpMidazAuthFetch<TransactionEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(transaction)
    })

    return response
  }
}
