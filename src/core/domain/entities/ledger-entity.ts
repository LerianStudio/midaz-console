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


export type LedgerPortfoliosEntity = {
  id: string
  entity_id: string
  metadata: {
    value: string
  }
}