import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazCreateProductRepository implements CreateProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    product: ProductEntity
  ): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazCreateProductRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
