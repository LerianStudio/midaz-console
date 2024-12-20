import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import {
  CreateTransactionDto,
  TransactionResponseDto
} from '../dto/transaction-dto'
import { isNumber } from 'lodash'

export class TransactionMapper {
  static toDomain(transaction: CreateTransactionDto): TransactionEntity {
    return {
      send: {
        asset: transaction.asset,
        ...TransactionMapper.valueToAmount(transaction.value),
        source: {
          from: transaction.source.map((source) => ({
            account: source.account,
            amount: {
              asset: transaction.asset,
              ...TransactionMapper.valueToAmount(source.value)
            },
            metadata: source.metadata ?? {}
          }))
        }
      },
      distribute: {
        to: transaction.destination.map((destination) => ({
          account: destination.account,
          amount: {
            asset: transaction.asset,
            ...TransactionMapper.valueToAmount(destination.value)
          },
          metadata: destination.metadata ?? {}
        }))
      },
      metadata: transaction.metadata ?? {}
    }
  }

  static toResponseDto(transaction: TransactionEntity): TransactionResponseDto {
    return transaction
  }

  static valueToAmount(value: number) {
    if (!isNumber(value)) {
      throw new Error(
        `TransactionMapper.valueToAmount: value ${value} is not a number`
      )
    }

    let resultValue = value
    let scale = 0

    while (resultValue % 1 !== 0) {
      resultValue *= 10
      scale++
    }

    return { value: resultValue, scale }
  }
}
