export type LedgerPortfoliosEntity = {
  id: string
  ledger_id: string
  entity_id: string
  portfolio_name: string
  metadata: Record<string, string> | null
  status: {
    code: string
    description: string | null
  }
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
