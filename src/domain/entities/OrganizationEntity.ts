export type OrganizationEntity = {
  id?: string
  parentOrganizationId?: string
  legalName: string
  doingBusinessAs?: string
  legalDocument: number
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
  line2: string
  neighborhood: string
  zipCode: number
  city: string
  state: string
  country: string
}
