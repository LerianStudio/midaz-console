import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
  metadata: z.array(
    z
      .object({
        key: z.string(),
        value: z.string()
      })
      .optional()
  )
})
