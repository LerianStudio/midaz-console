import { StatusEntity } from './status-entity'

export type AccountEntity = {
  id?: string
  ledgerId?: string
  organizationId?: string
  name: string
  alias: string
  type: string
  assetCode: string
  entityId?: string
  status: StatusEntity
  metadata: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
