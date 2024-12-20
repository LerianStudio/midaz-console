import { TransactionEntity } from '@/core/domain/entities/transaction-entity'

type CreateTransactionSourceDto = {
  account: string
  value: number
  description?: string
  chartOfAccounts?: string
  metadata: Record<string, any>
}

export type CreateTransactionDto = {
  description?: string
  chartOfAccountsGroupName?: string
  value: number
  asset: string
  source: CreateTransactionSourceDto[]
  destination: CreateTransactionSourceDto[]
  metadata: Record<string, any>
}

export type TransactionResponseDto = TransactionEntity
