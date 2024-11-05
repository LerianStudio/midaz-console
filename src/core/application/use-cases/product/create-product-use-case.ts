import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductDto, ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'

export interface CreateProduct {
  execute: (
    organizationId: string,
    ledgerId: string,
    product: CreateProductDto
  ) => Promise<ProductResponseDto>
}

export class CreateProductUseCase implements CreateProduct {
  constructor(
    private readonly createProductRepository: CreateProductRepository
  ) {}
  async execute(
    organizationId: string,
    ledgerId: string,
    product: CreateProductDto
  ): Promise<ProductResponseDto> {
    const productEntity: ProductEntity = ProductMapper.toDomain(product)

    const productCreated = await this.createProductRepository.create(
      organizationId,
      ledgerId,
      productEntity
    )

    const productResponseDto: ProductResponseDto =
      ProductMapper.toResponseDto(productCreated)

    return productResponseDto
  }
}
