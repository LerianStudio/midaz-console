import { z } from 'zod'


export function getDivisionsFormSchema() {
  return  z.object({
    legalName: z.string(),
    tradeName: z.string(),
    legalDocument: z.string(),
    address: z.string(),
    complement: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    zipCode: z.string(),
    timeZone: z.string(),
    defaultCurrency: z.string()
  })
  
}
