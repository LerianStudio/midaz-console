import { StatusDto } from './status.dto'

export interface CreateProductDto {
  name: string
  status: StatusDto
  metadata: Record<string, any>
}

export interface ProductResponseDto {
  id: string
  ledgerId: string
  organizationId: string
  name: string
  status: StatusDto
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface UpdateProductDto {
  name?: string
  status?: StatusDto
  metadata?: Record<string, any>
}
