export type LedgerEntity = {
  id: string
  organizationId: string
  name: string
  metadata: {
    value: string
  }
  status: {
    code: string
    description: string
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
}
