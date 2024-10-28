import { AccountEntity } from '@/core/domain/entities/account-entity'
import {
  AccountResponseDto,
  CreateAccountDto,
  UpdateAccountDto
} from '../dto/account-dto'

export function accountEntityToDto(account: AccountEntity): AccountResponseDto {
  return {
    id: account.id!,
    entityId: account.entityId!,
    ledgerId: account.ledgerId!,
    organizationId: account.organizationId!,
    name: account.name,
    status: {
      ...account.status,
      description: account.status.description ?? ''
    },
    type: account.type,
    metadata: account.metadata ?? {},
    createdAt: account.createdAt!,
    updatedAt: account.updatedAt!,
    deletedAt: account.deletedAt ?? null,
    alias: account.alias,
    assetCode: account.assetCode,
    parentAccountId: account.parentAccountId!,
    productId: account.productId!,
    portfolioId: account.portfolioId!
  }
}

export function accountDtoToEntity(dto: CreateAccountDto): AccountEntity {
  return {
    entityId: dto.entityId,
    alias: dto.alias,
    name: dto.name,
    type: dto.type,
    assetCode: dto.assetCode,
    status: dto.status,
    parentAccountId: dto.parentAccountId,
    productId: dto.productId,
    metadata: dto.metadata ?? {}
  }
}

export function accountUpdateDtoToEntity(
  dto: UpdateAccountDto
): Partial<AccountEntity> {
  return {
    ...dto
  }
}
