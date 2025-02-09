import { TransactionEntity } from '@/core/domain/entities/transaction-entity'
import { StatusDto } from './status.dto'

export type CreateTransactionSourceDto = {
  account: string
  amount: {
    asset: string
    value: number
  }
  share?: {
    percentage: number
    percentageOfPercentage: number
  }
  chartOfAccounts?: string
  description?: string
  metadata: Record<string, any>
}

export type CreateTransactionDto = {
  description?: string
  chartOfAccountsGroupName?: string
  send: {
    asset: string
    value: number
    source: {
      from: CreateTransactionSourceDto[]
    }
    distribute: {
      to: CreateTransactionSourceDto[]
    }
  }
  metadata: Record<string, any>
}

// export type TransactionResponseDto = TransactionEntity

export type OperationDto = {
  id: string
  transactionId: string
  description: string
  type: string
  assetCode: string
  chartOfAccounts: string
  amount: {
    amount: number
    scale: number
  }
  balance: {
    available: number
    onHold: number
    scale: number
  }
  balanceAfter: {
    available: number
    onHold: number
    scale: number
  }
  status: StatusDto
  accountId: string
  accountAlias: string
  organizationId: string
  ledgerId: string
  portfolioId?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  metadata: Record<string, unknown>
}

export type TransactionResponseDto = {
  id: string
  description?: string
  template: string
  status: StatusDto
  amount: number
  amountScale: number
  assetCode: string
  chartOfAccountsGroupName: string
  source: string[]
  destination: string[]
  ledgerId: string
  organizationId: string
  operations: OperationDto[]
  metadata: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}
