import { StatusEntity } from './status-entity'

export type PortfoliosEntity = {
  id?: string
  entityId: string
  ledgerId: string
  organizationId: string
  name: string
  status: StatusEntity
  metadata: Record<string, any> | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}
