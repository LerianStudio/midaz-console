import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazCreateProductRepository implements CreateProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    product: ProductEntity
  ): Promise<ProductEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products`

    const response = await httpMidazAuthFetch<ProductEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(product)
    })

    return response
  }
}
