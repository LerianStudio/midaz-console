import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

export class MidazFetchAllPortfoliosRepository
  implements FetchAllPortfoliosRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<PortfolioEntity>> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios?limit=${limit}&page=${page}`,
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
