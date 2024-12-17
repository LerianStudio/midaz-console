import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { ProductResponseDto, UpdateProductDto } from '../../dto/product-dto'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { ProductMapper } from '../../mappers/product-mapper'
import { inject, injectable } from 'inversify'

export interface UpdateProduct {
  execute: (
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<UpdateProductDto>
  ) => Promise<ProductResponseDto>
}

@injectable()
export class UpdateProductUseCase implements UpdateProduct {
  constructor(
    @inject(UpdateProductRepository)
    private readonly updateProductRepository: UpdateProductRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<UpdateProductDto>
  ): Promise<ProductResponseDto> {
    const productEntity: Partial<ProductEntity> =
      ProductMapper.toDomain(product)

    const updatedProduct: ProductEntity =
      await this.updateProductRepository.update(
        organizationId,
        ledgerId,
        productId,
        productEntity
      )

    return ProductMapper.toResponseDto(updatedProduct)
  }
}
