import { AccountEntity } from '@/core/domain/entities/account-entity'
import { AccountResponseDto } from '../dto/account-dto'

export function accountEntityToDto(account: AccountEntity): AccountResponseDto {
  console.log('Account entity to dto', account)
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
    metadata: account.metadata,
    createdAt: account.createdAt!,
    updatedAt: account.updatedAt!,
    deletedAt: account.deletedAt ?? null
  }
}

// export function accountDtoToEntity(dto: CreateAccountDto): AccountEntity {
//   return {
//     entityId: dto.entityId,
//     ledgerId: dto.ledgerId,
//     name: dto.name,
//     type: dto.type,
//     metadata: dto.metadata ?? {}
//   }
// }

// export function accountUpdateDtoToEntity(
//   dto: UpdateAccountDto
// ): Partial<AccountEntity> {
//   return {
//     ...dto
//   }
// }
