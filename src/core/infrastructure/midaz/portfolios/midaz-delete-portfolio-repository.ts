import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazDeletePortfolioRepository implements DeleteProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<void> {
    // const response = await fetch(
    //   `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`,
    //   {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )

    // if (!response.ok) {
    //   const midazResponse = await response.json()
    //   console.error('MidazDeleteProductRepository', midazResponse)
    //   throw await handleMidazError(midazResponse)
    // }

    // return

    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`

    await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
