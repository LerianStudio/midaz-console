import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductDto, ProductResponseDto } from '../../dto/product-dto'
import {
  productDtoToEntity,
  productEntityToDto
} from '../../mappers/product-mapper'
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
    console.log('CreateProductUseCase -> execute -> product', product)
    const productEntity: ProductEntity = productDtoToEntity(product)

    console.log(
      'CreateProductUseCase -> execute -> productEntity',
      productEntity
    )

    const productCreated = await this.createProductRepository.create(
      organizationId,
      ledgerId,
      productEntity
    )

    const productResponseDto: ProductResponseDto =
      productEntityToDto(productCreated)

    return productResponseDto
  }
}
