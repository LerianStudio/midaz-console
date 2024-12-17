import { ProductEntity } from '../../entities/product-entity'

export abstract class UpdateProductRepository {
  abstract update: (
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<ProductEntity>
  ) => Promise<ProductEntity>
}
