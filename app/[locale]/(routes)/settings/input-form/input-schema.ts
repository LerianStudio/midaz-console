import { z } from 'zod'

export const inputSchema = z.object({
  id: z.string().optional(),
  name: z.string().default(''),
  document: z.string().default(''),
  metadata: z.record(z.any()).optional(),
  status: z
    .object({
      code: z.string(),
      description: z.string()
    })
    .default({ code: '', description: '' })
})
