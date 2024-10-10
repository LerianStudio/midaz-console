import { StatusEntity } from './status-entity'

export type PortfoliosEntity = {
  id?: string
  ledgerId?: string
  organizationId?: string
  name: string
  entityId: string
  status: StatusEntity
  metadata: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
