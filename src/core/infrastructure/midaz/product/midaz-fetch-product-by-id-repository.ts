import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { injectable } from 'inversify'

@injectable()
export class MidazFetchProductByIdRepository
  implements FetchProductByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<ProductEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`

    const response = await httpMidazAuthFetch<ProductEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
