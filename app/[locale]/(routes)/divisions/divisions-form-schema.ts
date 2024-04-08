import { z } from 'zod'


export function getDivisionsFormSchema() {
  return  z.object({
    legalName: z.string(),
    doingBusinessAs: z.string(),
    legalDocument: z.string(),
    address: z.object({
      line1: z.string(),
      line2: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      zipCode: z.string()
    }),
    defaultTimezone: z.string(),
    defaultCurrency: z.string()
  })
}
