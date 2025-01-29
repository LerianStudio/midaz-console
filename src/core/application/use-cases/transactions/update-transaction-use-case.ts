import { UpdateTransactionRepository } from '@/core/domain/repositories/transactions/update-transaction-repository'
import { inject, injectable } from 'inversify'
import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { TransactionMapper } from '../../mappers/transaction-mapper'
import { UpdateTransactionDto } from '../../dto/update-transaction-dto'
import { TransactionResponseDto } from '../../dto/transaction-dto'

export interface UpdateTransaction {
  execute: (
    organizationId: string,
    ledgerId: string,
    transactionId: string,
    transaction: Partial<UpdateTransactionDto>
  ) => Promise<TransactionResponseDto>
}

@injectable()
export class UpdateTransactionUseCase implements UpdateTransaction {
  constructor(
    @inject(UpdateTransactionRepository)
    private readonly updateTransactionRepository: UpdateTransactionRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    transactionId: string,
    transaction: Partial<UpdateTransactionDto>
  ): Promise<TransactionResponseDto> {
    console.log('transaction use case', transaction)

    const transactionEntity = TransactionMapper.transactionMapperUpdate(
      transaction.description ?? '',
      transaction.metadata ?? {}
    )

    console.log('transaction entity', transactionEntity)

    console.log('transactionsentriuty', transactionEntity)

    const updatedTransaction: TransactionEntity =
      await this.updateTransactionRepository.update(
        organizationId,
        ledgerId,
        transactionId,
        transactionEntity
      )

    console.log('updatedTransaction', updatedTransaction)

    return TransactionMapper.toResponseDto(updatedTransaction)
  }
}
