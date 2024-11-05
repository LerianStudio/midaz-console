import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'

export interface FetchProductById {
  execute: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<ProductResponseDto>
}

export class FetchProductByIdUseCase implements FetchProductById {
  constructor(
    private readonly fetchProductByIdRepository: FetchProductByIdRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<ProductResponseDto> {
    const product = await this.fetchProductByIdRepository.fetchById(
      organizationId,
      ledgerId,
      productId
    )

    return ProductMapper.toResponseDto(product)
  }
}
