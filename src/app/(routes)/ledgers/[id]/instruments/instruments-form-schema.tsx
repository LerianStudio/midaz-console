import { z } from 'zod'

export const instrumentsSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3)
})
