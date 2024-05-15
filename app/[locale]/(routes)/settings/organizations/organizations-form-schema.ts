import { z } from 'zod'

const organizationFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  doingBusinessAs: z.string(),
  legalDocument: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string().nullable(),
    neighborhood: z.string(),
    zipCode: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string()
  }),
  defaultTimezone: z.string().nullable(),
  defaultCurrency: z.string().nullable(),
  defaultHolidayList: z
    .array(
      z.object({
        type: z.enum(['static', 'dynamic']),
        name: z.string(),
        month: z.number(),
        day: z.number().optional(),
        weekDay: z.number().optional(),
        position: z.number().optional()
      })
    )
    .nullable(),
  parentOrganizationId: z.string().nullable(),
  metadata: z.record(z.string(), z.string()).nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED'])
})

export { organizationFormSchema }
