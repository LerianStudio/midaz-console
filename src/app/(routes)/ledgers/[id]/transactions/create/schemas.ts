import { z } from 'zod'
import { transaction } from '@/schema/transactions'

export const transactionSourceFormSchema = z
  .array(
    z.object({
      account: transaction.source.account,
      value: transaction.value,
      description: transaction.description.optional(),
      chartOfAccounts: transaction.chartOfAccounts.optional(),
      metadata: transaction.metadata
    })
  )
  .nonempty()
  .default([] as any)

export const transactionFormSchema = z.object({
  description: transaction.description.optional(),
  chartOfAccountsGroupName: transaction.chartOfAccounts.optional(),
  asset: transaction.asset,
  value: transaction.value,
  source: transactionSourceFormSchema,
  destination: transactionSourceFormSchema,
  metadata: transaction.metadata
})

export type TransactionSourceFormSchema = z.infer<
  typeof transactionSourceFormSchema
>

export type TransactionFormSchema = z.infer<typeof transactionFormSchema>

export const initialValues = {
  description: '',
  chartOfAccountsGroupName: '',
  send: {
    asset: '',
    value: 0,
    source: [],
    distribute: []
  },
  metadata: {}
}

export const sourceInitialValues = {
  account: '',
  amount: {
    asset: '',
    value: 0
  },
  share: {
    percentage: 0,
    percentageOfPercentage: 0
  },
  description: '',
  chartOfAccounts: '',
  metadata: {}
}
