import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import {
  CreateTransactionDto,
  TransactionResponseDto
} from '../dto/transaction-dto'
import { isNumber } from 'lodash'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PaginationMapper } from './pagination-mapper'
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

  static toDecimalValue(amount: number, amountScale: number): number {
    return amount / 10 ** amountScale
  }

  static toResponseDto(transaction: TransactionEntity): TransactionResponseDto {
    const decimalValue = TransactionMapper.toDecimalValue(
      transaction.amount ?? 0,
      transaction.amountScale ?? 0
    )

    return { ...transaction, decimalValue }
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
    return PaginationMapper.toResponseDto(
      paginationEntity,
      TransactionMapper.toResponseDto
    )
  }
}
