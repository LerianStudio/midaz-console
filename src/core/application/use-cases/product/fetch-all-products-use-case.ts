import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { PaginationDto } from '../../dto/pagination-dto'
import { ProductResponseDto } from '../../dto/product-dto'
import { ProductMapper } from '../../mappers/product-mapper'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface FetchAllProducts {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationDto<ProductResponseDto>>
}

@injectable()
export class FetchAllProductsUseCase implements FetchAllProducts {
  constructor(
    @inject(FetchAllProductsRepository)
    private readonly fetchAllProductsRepository: FetchAllProductsRepository
  ) {}

  @LogOperation({ layer: 'application' })
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
