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
