import { PaginationEntity } from '../../entities/pagination-entity'
import { ProductEntity } from '../../entities/product-entity'

export abstract class FetchAllProductsRepository {
  abstract fetchAll: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ) => Promise<PaginationEntity<ProductEntity>>
}
