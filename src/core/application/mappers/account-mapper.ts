import { AccountEntity } from '@/core/domain/entities/account-entity'
import {
  AccountResponseDto,
  CreateAccountDto,
  UpdateAccountDto
} from '../dto/account-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'

export class AccountMapper {
  public static toDto(account: AccountEntity): AccountResponseDto {
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

  public static toDomain(
    dto: CreateAccountDto | UpdateAccountDto
  ): AccountEntity {
    return {
      entityId: dto.entityId,
      alias: dto.alias!,
      name: dto.name!,
      type: dto.type!,
      assetCode: dto.assetCode!,
      status: dto.status!,
      parentAccountId: dto.parentAccountId,
      productId: dto.productId,
      metadata: dto.metadata ?? {}
    }
  }

  static toPaginationResponseDto(
    result: PaginationEntity<AccountEntity>
  ): PaginationEntity<AccountResponseDto> {
    const entityDto =
      result.items && result.items !== null
        ? result.items.map(AccountMapper.toDto)
        : []

    return {
      items: entityDto,
      limit: result.limit,
      page: result.page
    }
  }
}
