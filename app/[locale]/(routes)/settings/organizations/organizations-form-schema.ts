import { z } from 'zod'

const organizationFormSchema = z.object({
  id: z.string().optional(),
  parentOrganizationId: z.string().optional(),
  legalName: z.string().refine((value) => value.length > 0, {
    message: 'Legal name is required'
  }),
  doingBusinessAs: z.string().min(1).max(100).optional(),
  legalDocument: z.coerce.number({
    invalid_type_error: 'Legal document must be a number'
  }),
  address: z
    .object({
      line1: z.string(),
      line2: z.string().optional(),
      neighborhood: z.string(),
      zipCode: z.coerce.number(),
      city: z.string(),
      state: z.string(),
      country: z.string()
    })
    .required(),
  metadata: z.record(z.string(), z.any()).optional(),
  status: z
    .object({
      code: z.string(),
      description: z.string()
    })
    .default({
      code: 'ACTIVE',
      description: 'organization is active'
    })
})

export { organizationFormSchema }
