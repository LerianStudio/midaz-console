import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { product } from '@/schema/product'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazDeleteProductRepository implements DeleteProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    const response = await httpMidazAuthFetch({
      url,
      method: HTTP_METHODS.DELETE
    })

    if (!response.ok) {
      const midazResponse = await response.json()
      console.error('MidazDeleteProductRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return
  }
}
