import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'
import { inject, injectable } from 'inversify'

export interface FetchProductById {
  execute: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<ProductResponseDto>
}

@injectable()
export class FetchProductByIdUseCase implements FetchProductById {
  constructor(
    @inject(FetchProductByIdRepository)
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
