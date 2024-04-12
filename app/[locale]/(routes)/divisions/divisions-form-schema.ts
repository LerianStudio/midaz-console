import { z } from 'zod'

export const formSchema = z.object({
    id: z.string(),
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
    status: z.string(),
    defaultTimezone: z.string(),
    defaultCurrency: z.string()
})