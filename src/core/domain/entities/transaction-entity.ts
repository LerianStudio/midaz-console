type TransactionSourceEntity = {
  account: string
  amount: {
    asset: string
    value: number
    scale: number
  }
  share?: {
    percentage: number
    percentageOfPercentage: number
  }
  remaining?: string
  description?: string
  chartOfAccounts?: string
  metadata: Record<string, any> | null
}

export type TransactionEntity = {
  id?: string
  description?: string
  chartOfAccountsGroupName?: string
  send: {
    asset: string
    value: number
    scale: number
    source: {
      from: TransactionSourceEntity[]
    }
    distribute: {
      to: TransactionSourceEntity[]
    }
  }
  metadata: Record<string, any> | null
  amount?: number
  amountScale?: number
  decimalValue?: number
}
