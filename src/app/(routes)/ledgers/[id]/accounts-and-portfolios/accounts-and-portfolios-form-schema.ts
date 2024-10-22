import { metadata } from '@/schema/metadata'
import { z } from 'zod'

export const formSchemaPortfolio = z.object({
  name: z.string().min(3),
  entityId: z.string().min(1).max(255).optional(),
  metadata: metadata
})

export const formSchemaAccount = z.object({
  name: z.string().min(3),
  alias: z.string().min(1).max(255).optional(),
  entityId: z.string().min(1).max(255).optional(),
  instrument: z.enum(['cash', 'equity', 'fixedIncome', 'derivative']),
  portfolio: z.enum(['cash', 'equity', 'fixedIncome', 'derivative']),
  product: z.enum(['individual', 'company', 'trust']),
  metadata: metadata
})
