import { TransactionMapper } from './transaction-mapper'
import { CreateTransactionDto } from '../dto/transaction-dto'
import { TransactionEntity } from '@/core/domain/entities/transaction-entity'

describe('TransactionMapper', () => {
  describe('toDomain', () => {
    it('should map CreateTransactionDto to TransactionEntity', () => {
      const dto: CreateTransactionDto = {
        asset: 'USD',
        value: 100,
        source: [
          {
            account: 'source-account-1',
            value: 50,
            metadata: { key: 'value' }
          }
        ],
        destination: [
          {
            account: 'destination-account-1',
            value: 50,
            metadata: { key: 'value' }
          }
        ],
        metadata: { key: 'value' }
      }

      const entity: TransactionEntity = TransactionMapper.toDomain(dto)

      expect(entity).toEqual({
        code: '',
        send: {
          asset: 'USD',
          value: 100,
          scale: 0,
          source: {
            from: [
              {
                account: 'source-account-1',
                amount: {
                  asset: 'USD',
                  value: 50,
                  scale: 0
                },
                metadata: { key: 'value' }
              }
            ]
          }
        },
        distribute: {
          to: [
            {
              account: 'destination-account-1',
              amount: {
                asset: 'USD',
                value: 50,
                scale: 0
              },
              metadata: { key: 'value' }
            }
          ]
        },
        metadata: { key: 'value' }
      })
    })
  })

  describe('toResponseDto', () => {
    it('should map TransactionEntity to TransactionResponseDto', () => {
      const entity: TransactionEntity = {
        code: '123',
        send: {
          asset: 'USD',
          value: 100,
          scale: 0,
          source: {
            from: [
              {
                account: 'source-account-1',
                amount: {
                  asset: 'USD',
                  value: 50,
                  scale: 0
                },
                metadata: { key: 'value' }
              }
            ]
          }
        },
        distribute: {
          to: [
            {
              account: 'destination-account-1',
              amount: {
                asset: 'USD',
                value: 50,
                scale: 0
              },
              metadata: { key: 'value' }
            }
          ]
        },
        metadata: { key: 'value' }
      }

      const responseDto = TransactionMapper.toResponseDto(entity)

      expect(responseDto).toEqual(entity)
    })
  })

  describe('valueToAmount', () => {
    it('should convert value to amount with scale', () => {
      const value = 123.45
      const amount = TransactionMapper.valueToAmount(value)

      expect(amount).toEqual({ value: 12345, scale: 2 })
    })

    it('should handle integer values correctly', () => {
      const value = 100
      const amount = TransactionMapper.valueToAmount(value)

      expect(amount).toEqual({ value: 100, scale: 0 })
    })

    it('should throw an error for non-numeric values', () => {
      const value = 'abc'
      expect(() => TransactionMapper.valueToAmount(value as any)).toThrow(
        `TransactionMapper.valueToAmount: value ${value} is not a number`
      )
    })

    it('should throw an error for null values', () => {
      const value = null
      expect(() => TransactionMapper.valueToAmount(value as any)).toThrow(
        `TransactionMapper.valueToAmount: value ${value} is not a number`
      )
    })

    it('should throw an error for undefined values', () => {
      const value = undefined
      expect(() => TransactionMapper.valueToAmount(value as any)).toThrow(
        `TransactionMapper.valueToAmount: value ${value} is not a number`
      )
    })
  })
})
