import { StatusDto } from '@/core/application/dto/status.dto'

export type ILedgerType = {
  id: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
