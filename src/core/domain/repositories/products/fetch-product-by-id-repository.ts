import { ProductEntity } from '../../entities/product-entity'

export interface FetchProductByIdRepository {
  fetchById: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<ProductEntity>
}
