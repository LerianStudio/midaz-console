import { StatusDto } from './status.dto'

export interface LedgerResponseDto {
  id: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, string> | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
