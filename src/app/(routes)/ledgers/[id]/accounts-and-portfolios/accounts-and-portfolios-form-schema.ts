import { metadata } from '@/schema/metadata'
import { z } from 'zod'

export const formSchemaPortfolio = z.object({
  name: z.string().min(3),
  entityId: z.string().min(1).max(255).optional(),
  metadata: metadata
})
