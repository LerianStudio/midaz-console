import { StatusDto } from './status.dto'

export interface CreatePortfolioDto {
  entityId: string
  ledgerId: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, any> | null
}

export interface PortfolioResponseDto {
  id?: string
  ledgerId?: string
  organizationId?: string
  entityId: string
  name: string
  status: StatusDto
  metadata: Record<string, any> | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}

export interface UpdatePortfolioDto {
  name?: string
  status?: StatusDto
  metadata?: Record<string, any>
}
