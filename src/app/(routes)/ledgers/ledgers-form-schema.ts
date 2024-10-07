import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(3),
  metadata: z
    .array(
      z
        .object({
          key: z.string().optional(),
          value: z.string().optional()
        })
        .optional()
    )
    .optional()
})