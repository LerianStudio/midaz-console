type Organization = {
  id: string
  name: string
  doingBusinessAs: string
  legalDocument: string
  address: {
    line1: string
    line2: string | null
    neighborhood: string
    zipCode: string
    city: string
    state: string
    country: string
  }
  defaultTimezone: string | null
  defaultCurrency: string | null
  defaultHolidayList: Array<{
    type: 'static' | 'dynamic'
    name: string
    month: number
    day?: number
    weekDay?: number
    position?: number
  }> | null
  parentOrganizationId: string | null
  metadata: Record<string, any> | null
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'DELETED'
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type Organizations = Organization
