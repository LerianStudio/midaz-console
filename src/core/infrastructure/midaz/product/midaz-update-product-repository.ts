import { ProductEntity } from '@/core/domain/entities/product-entity'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { m } from 'framer-motion'
import { Update } from 'next/dist/build/swc'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazUpdateProductRepository implements UpdateProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async update(
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazUpdateProductRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
