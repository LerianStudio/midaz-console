export type OrganizationEntity = {
  id?: string
  parentOrganizationId?: string
  legalName: string
  doingBusinessAs?: string
  legalDocument: string
  address: Address
  metadata: Record<string, any>
  status: OrganizationStatus
}

type OrganizationStatus = {
  code: string
  description: string
}

type Address = {
  line1: string
  line2?: string
  neighborhood: string
  zipCode: string
  city: string
  state: string
  country: string
}
