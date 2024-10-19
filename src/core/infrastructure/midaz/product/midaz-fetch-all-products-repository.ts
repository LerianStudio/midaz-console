import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchAllProductsRepository
  implements FetchAllProductsRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<ProductEntity>> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAllProductsRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
