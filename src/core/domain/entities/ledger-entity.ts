export type LedgerEntity = {
  id: string
  organizationId: string
  name: string
  metadata: Record<string, string> | null
  status: {
    code: string
    description: string | null
  }
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
