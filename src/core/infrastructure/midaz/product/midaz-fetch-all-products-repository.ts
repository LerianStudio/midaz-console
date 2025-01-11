import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { HTTP_METHODS, MidazHttpFetchUtils } from '../../utils/http-fetch-utils'
import { inject, injectable } from 'inversify'

@injectable()
export class MidazFetchAllProductsRepository
  implements FetchAllProductsRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}
  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<ProductEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products?limit=${limit}&page=${page}`

    const response = await this.midazHttpFetchUtils.httpMidazAuthFetch<
      PaginationEntity<ProductEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
