import { ProductEntity } from '@/core/domain/entities/product-entity'
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto
} from '../dto/product-dto'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PaginationMapper } from './pagination-mapper'

export class ProductMapper {
  static toDomain(dto: CreateProductDto | UpdateProductDto): ProductEntity {
    return {
      name: dto.name!,
      status: dto.status!,
      metadata: dto.metadata!
    }
  }

  static toResponseDto(product: ProductEntity): ProductResponseDto {
    return {
      id: product.id!,
      organizationId: product.organizationId!,
      ledgerId: product.ledgerId!,
      name: product.name,
      status: {
        code: product.status.code,
        description: product.status.description ?? ''
      },
      metadata: product.metadata ?? {},
      createdAt: product.createdAt!,
      updatedAt: product.updatedAt!,
      deletedAt: product.deletedAt!
    }
  }

  static toPaginationResponseDto(
    result: PaginationEntity<ProductEntity>
  ): PaginationEntity<ProductResponseDto> {
    return PaginationMapper.toResponseDto(result, ProductMapper.toResponseDto)
  }
}
