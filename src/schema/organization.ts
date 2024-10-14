import { z } from 'zod'
import { address } from './address'

const id = z.string().optional()

const parentOrganizationId = z.string().optional().nullable()

const legalName = z.string().min(1)

const doingBusinessAs = z.string().min(1).max(100).optional()

const legalDocument = z.coerce.string({
  invalid_type_error: 'Legal document must be a number'
})

const metadata = z.record(z.string(), z.any()).optional()

const organizationAccentColor = z.string().optional()

const organizationAvatar = z.string().optional()

const status = z
  .object({
    code: z.string(),
    description: z.string()
  })
  .default({
    code: 'ACTIVE',
    description: 'organization is active'
  })

export const organization = {
  id,
  parentOrganizationId,
  legalName,
  doingBusinessAs,
  legalDocument,
  metadata,
  organizationAccentColor,
  organizationAvatar,
  status,
  address
}
