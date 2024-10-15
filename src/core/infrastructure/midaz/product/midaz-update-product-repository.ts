import { ProductEntity } from '@/core/domain/entities/product-entity'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { m } from 'framer-motion'
import { Update } from 'next/dist/build/swc'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazUpdateProductRepository implements UpdateProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async update(
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    const response = await httpMidazAuthFetch<ProductEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(product)
    })

    return response
  }
}
