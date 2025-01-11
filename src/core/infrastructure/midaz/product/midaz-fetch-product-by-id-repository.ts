import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { HTTP_METHODS, MidazHttpFetchUtils } from '../../utils/http-fetch-utils'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { injectable, inject } from 'inversify'

@injectable()
export class MidazFetchProductByIdRepository
  implements FetchProductByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async fetchById(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<ProductEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<ProductEntity>({
        url,
        method: HTTP_METHODS.GET
      })

    return response
  }
}
