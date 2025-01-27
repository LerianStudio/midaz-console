import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import {
  CreateTransactionDto,
  TransactionResponseDto
} from '../dto/transaction-dto'
import { isNumber } from 'lodash'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'

type FormatTransactionValueProps = {
  amount: number
  amountScale: number
}

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
            metadata:
              Object.keys(source.metadata).length !== 0 ? source.metadata : null
          }))
        },
        distribute: {
          to: transaction.destination.map((destination) => ({
            account: destination.account,
            amount: {
              asset: transaction.asset,
              ...TransactionMapper.valueToAmount(destination.value)
            },
            metadata:
              Object.keys(destination.metadata).length !== 0
                ? destination.metadata
                : null
          }))
        }
      },
      metadata:
        Object.keys(transaction.metadata).length !== 0
          ? transaction.metadata
          : null
    }
  }

  static toResponseDto(transaction: TransactionEntity): TransactionResponseDto {
    return transaction
  }

  static formatTransactionValue(
    transaction: FormatTransactionValueProps,
    locale?: string
  ): string {
    const { amount, amountScale } = transaction

    const numericValue = amount / 10 ** amountScale

    const decimalString = numericValue.toLocaleString(locale ?? undefined, {
      minimumFractionDigits: amountScale,
      maximumFractionDigits: amountScale
    })

    return decimalString
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

  static toPaginatedResponseDto(
    paginationEntity: PaginationEntity<TransactionEntity>
  ): PaginationEntity<TransactionResponseDto> {
    return {
      ...paginationEntity,
      items: paginationEntity.items.map((transaction) =>
        TransactionMapper.toResponseDto(transaction)
      )
    }
  }
}
