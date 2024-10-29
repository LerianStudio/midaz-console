import { ProductEntity } from '../../entities/product-entity'

export interface CreateProductRepository {
  create: (
    organizationId: string,
    ledgerId: string,
    product: ProductEntity
  ) => Promise<ProductEntity>
}
