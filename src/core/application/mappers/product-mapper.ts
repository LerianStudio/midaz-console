import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductDto, ProductResponseDto } from '../dto/product-dto'

export function productEntityToDto(product: ProductEntity): ProductResponseDto {
  return {
    id: product.id!,
    organizationId: product.organizationId!,
    ledgerId: product.ledgerId!,
    name: product.name,
    status: product.status,
    metadata: product.metadata,
    createdAt: product.createdAt!,
    updatedAt: product.updatedAt!,
    deletedAt: product.deletedAt!
  }
}

export function productDtoToEntity(dto: CreateProductDto): ProductEntity {
  return {
    name: dto.name,
    status: dto.status,
    metadata: dto.metadata
  }
}

export function productUpdateDtoToEntity(
  dto: Partial<CreateProductDto>
): Partial<ProductEntity> {
  return {
    ...dto
  }
}
