import { PaginationEntity } from '../../entities/pagination-entity'
import { ProductEntity } from '../../entities/product-entity'

export interface FetchAllProductsRepository {
  fetchAll: (
    organizationId: string,
    ledgerId: string
  ) => Promise<PaginationEntity<ProductEntity>>
}
