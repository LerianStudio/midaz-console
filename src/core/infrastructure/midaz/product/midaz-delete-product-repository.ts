import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import {
  httpMidazAuthFetch,
  HTTP_METHODS,
  MidazHttpFetchUtils
} from '../../utils/http-fetch-utils'
import { inject, injectable, LazyServiceIdentifier } from 'inversify'

@injectable()
export class MidazDeleteProductRepository implements DeleteProductRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  constructor(
    @inject(new LazyServiceIdentifier(() => MidazHttpFetchUtils))
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}
  async delete(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    await this.midazHttpFetchUtils.httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
