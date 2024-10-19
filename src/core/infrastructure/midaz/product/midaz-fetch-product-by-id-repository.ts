import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchProductByIdRepository
  implements FetchProductByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchProductByIdRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
