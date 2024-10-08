import { StatusEntity } from './status-entity'

export type LedgerEntity = {
  id?: string
  organizationId?: string
  name: string
  metadata: Record<string, string> | null
  status: StatusEntity
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type LedgerPortfoliosEntity = {
  id: string
  entity_id: string
  metadata: {
    value: string
  }
}
