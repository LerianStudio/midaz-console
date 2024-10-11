import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import {
  CreatePortfolioDto,
  PortfolioResponseDto,
  UpdatePortfolioDto
} from '../dto/portfolios-dto'

export function portfolioEntityToDto(
  portfolio: PortfoliosEntity
): PortfolioResponseDto {
  return {
    id: portfolio.id!,
    entityId: portfolio.entityId!,
    ledgerId: portfolio.ledgerId!,
    organizationId: portfolio.organizationId!,
    name: portfolio.name,
    status: portfolio.status,
    metadata: portfolio.metadata,
    createdAt: portfolio.createdAt!,
    updatedAt: portfolio.updatedAt!,
    deletedAt: portfolio.deletedAt ?? null
  }
}

export function portfolioDtoToEntity(
  dto: CreatePortfolioDto
): PortfoliosEntity {
  return {
    entityId: dto.entityId,
    name: dto.name,
    ledgerId: dto.ledgerId,
    organizationId: dto.organizationId,
    status: dto.status,
    metadata: dto.metadata ?? {}
  }
}

export function portfolioUpdateDtoToEntity(
  dto: UpdatePortfolioDto
): Partial<PortfoliosEntity> {
  return {
    ...dto
  }
}
