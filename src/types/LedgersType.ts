export type Ledger = {
  id: string
  organizationId: string
  name: string
  divisionId: string
  defaultTimezone: string
  defaultCurrency: string
  defaultHolidayList: string
  assets: []
  metadata: {
    value: string
  }
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
