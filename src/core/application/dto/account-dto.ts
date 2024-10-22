import { StatusDto } from './status.dto'

export interface CreateAccountDto {
  assetCode: string
  name: string
  alias: string
  type: string
  entityId?: string | null
  parentAccountId?: string | null
  productId?: string
  status: {
    code: string
    description: string
  }
  metadata?: Record<string, any>
}

export interface AccountResponseDto {
  id: string
  ledgerId: string
  assetCode: string
  organizationId: string
  name: string
  alias: string
  type: string
  entityId: string
  parentAccountId: string
  productId: string
  status: StatusDto
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface UpdateAccountDto {
  assetCode?: string
  name?: string
  alias?: string
  type?: string
  entityId?: string
  parentAccountId?: string
  productId?: string
  status?: StatusDto
  metadata?: Record<string, any>
}
