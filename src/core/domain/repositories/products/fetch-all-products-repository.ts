import { PaginationEntity } from '../../entities/pagination-entity'
import { ProductEntity } from '../../entities/product-entity'

export interface FetchAllProductsRepository {
  fetchAll: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationEntity<ProductEntity>>
}
