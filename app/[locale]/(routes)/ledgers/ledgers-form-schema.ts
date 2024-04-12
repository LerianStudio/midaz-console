import { z } from 'zod'

export const formSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  divisionId: z.string(),
  defaultTimezone: z.string(),
  defaultCurrency: z.string(),
  defaultHolidayList: z.string(),
  assets: z.array(z.unknown()),
  metadata: z.object({
    value: z.string()
  }),
  status: z.string(),
  divisionName: z.string().optional()
})
