import { ProductEntity } from '@/core/domain/entities/product-entity'
import type {
  CreateProductDto,
  ProductResponseDto
} from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface CreateProduct {
  execute: (
    organizationId: string,
    ledgerId: string,
    product: CreateProductDto
  ) => Promise<ProductResponseDto>
}

@injectable()
export class CreateProductUseCase implements CreateProduct {
  constructor(
    @inject(CreateProductRepository)
    private readonly createProductRepository: CreateProductRepository
  ) {}

  @LogOperation({ layer: 'application' })
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
