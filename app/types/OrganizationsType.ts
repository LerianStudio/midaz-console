type Organization = {
  id?: string
  parentOrganizationId?: string
  legalName: string
  doingBusinessAs: string
  legalDocument: string
  address: Address
  metadata: Record<string, any>
  status: OrganizationStatus
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

type OrganizationStatus = {
  code: string
  description: string
}

type Address = {
  line1: string
  line2: string
  neighborhood: string
  zipCode: string
  city: string
  state: string
  country: string
}

export type Organizations = Organization
