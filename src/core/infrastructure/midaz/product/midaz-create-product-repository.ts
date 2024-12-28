import { ProductEntity } from '@/core/domain/entities/product-entity'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'
import { MidazId } from '../../logger/decorators/MidazId.decorator'
import { MIDAZ_ID_KEY } from '../../logger/decorators/midaz-id'
import { MidazRequestContext } from '../../logger/decorators/midaz-id'
import { container } from '../../container-registry/container-registry'

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
