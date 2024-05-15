export type OrganizationEntity = {
  id?: string
  parentOrganizationId: string | null
  legalName: string
  doingBusinessAs: string
  legalDocument: string
  address: {
    line1: string
    line2?: string
    zipCode: string
    city: string
    state: string
    country: string
  }
  metadata?: Record<string, string>
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'DELETED'
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
