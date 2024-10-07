import { ProductEntity } from '../../entities/product-entity'

export interface UpdateProductRepository {
  update: (
    organizationId: string,
    ledgerId: string,
    productId: string,
    product: Partial<ProductEntity>
  ) => Promise<ProductEntity>
}
