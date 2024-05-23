import { z } from 'zod'

const organizationFormSchema = z.object({
  id: z.string().optional(),
  parentOrganizationId: z.string().optional(),
  legalName: z.string().default(''),
  doingBusinessAs: z.string().default(''),
  legalDocument: z.string().default(''),
  address: z
    .object({
      line1: z.string(),
      line2: z.string().optional(),
      neighborhood: z.string(),
      zipCode: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string()
    })
    .default({
      line1: '',
      neighborhood: '',
      zipCode: '',
      city: '',
      state: '',
      country: ''
    }),
  metadata: z.record(z.any()).optional(),
  status: z
    .object({
      code: z.string(),
      description: z.string()
    })
    .default({
      code: 'ACTIVE',
      description: 'organization is active'
    }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional()
})

export { organizationFormSchema }
