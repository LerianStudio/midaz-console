import { StatusDto } from '@/core/application/dto/status.dto'
export interface ILedgerType {
  id: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, any> | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
