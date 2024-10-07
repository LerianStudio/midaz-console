import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { PaginationDto } from '../dto/pagination-dto'

// export async function paginationEntityToDto<T>(
//   paginationEntity: PaginationEntity<T>,
//   mapperItem = (item: T) => Promise<T>
// ): Promise<PaginationDto<T>> {

//   const items = paginationEntity.items.map(mapperItem)
//   return {
//     items: items,
//     limit: paginationEntity.limit,
//     page: paginationEntity.page
//   }
// }
