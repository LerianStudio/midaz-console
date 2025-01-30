import { z } from 'zod'

export const formSchema = z.object({
  description: z.string().optional(),
  chartOfAccountsGroupName: z.string().optional(),
  value: z.string().optional(),
  asset: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  source: z
    .array(
      z.object({
        account: z.string(),
        value: z.string().optional()
      })
    )
    .optional(),
  destination: z
    .array(
      z.object({
        account: z.string(),
        value: z.string().optional()
      })
    )
    .optional()
})
