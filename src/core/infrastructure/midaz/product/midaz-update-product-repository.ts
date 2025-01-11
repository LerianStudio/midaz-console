import { ProductEntity } from '@/core/domain/entities/product-entity'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { HTTP_METHODS, MidazHttpFetchUtils } from '../../utils/http-fetch-utils'
import { injectable, inject } from 'inversify'

@injectable()
export class MidazUpdateProductRepository implements UpdateProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async update(
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<ProductEntity>({
        url,
        method: HTTP_METHODS.PATCH,
        body: JSON.stringify(product)
      })

    return response
  }
}
