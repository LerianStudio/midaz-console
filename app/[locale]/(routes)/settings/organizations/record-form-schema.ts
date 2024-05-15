import { z } from 'zod'

const recordFormSchema = z.object({
  key: z.string(),
  value: z.string()
})

export { recordFormSchema }
