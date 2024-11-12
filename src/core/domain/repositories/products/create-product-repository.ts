import { ProductEntity } from '../../entities/product-entity'

export abstract class CreateProductRepository {
  abstract create: (
    organizationId: string,
    ledgerId: string,
    product: ProductEntity
  ) => Promise<ProductEntity>
}
