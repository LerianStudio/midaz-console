import { ProductEntity } from '../../entities/product-entity'

export abstract class FetchProductByIdRepository {
  abstract fetchById: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<ProductEntity>
}
