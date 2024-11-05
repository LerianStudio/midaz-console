import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { PaginationDto } from '../../dto/pagination-dto'
import { ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'

export interface FetchAllProducts {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<ProductResponseDto>>
}

export class FetchAllProductsUseCase implements FetchAllProducts {
  constructor(
    private readonly fetchAllProductsRepository: FetchAllProductsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<ProductResponseDto>> {
    const productsResult = await this.fetchAllProductsRepository.fetchAll(
      organizationId,
      ledgerId,
      limit,
      page
    )

    return ProductMapper.toPaginationResponseDto(productsResult)
  }
}
