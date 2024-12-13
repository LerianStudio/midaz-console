import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductDto, ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { inject, injectable } from 'inversify'
import { LoggerAggregator } from '../../logger/logger-aggregator'

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
    private readonly createProductRepository: CreateProductRepository,
    @inject(LoggerAggregator)
    private readonly loggerAggregator: LoggerAggregator
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
