import { Container, ContainerModule } from '../../utils/di/container'

import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'

import { MidazCreateProductRepository } from '../product/midaz-create-product-repository'
import { MidazFetchAllProductsRepository } from '../product/midaz-fetch-all-products-repository'
import { MidazUpdateProductRepository } from '../product/midaz-update-product-repository'
import { MidazDeleteProductRepository } from '../product/midaz-delete-product-repository'
import { MidazFetchProductByIdRepository } from '../product/midaz-fetch-product-by-id-repository'

export const MidazProductModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<CreateProductRepository>(CreateProductRepository)
      .to(MidazCreateProductRepository)

    container
      .bind<FetchAllProductsRepository>(FetchAllProductsRepository)
      .to(MidazFetchAllProductsRepository)

    container
      .bind<UpdateProductRepository>(UpdateProductRepository)
      .to(MidazUpdateProductRepository)

    container
      .bind<DeleteProductRepository>(DeleteProductRepository)
      .to(MidazDeleteProductRepository)

    container
      .bind<FetchProductByIdRepository>(FetchProductByIdRepository)
      .to(MidazFetchProductByIdRepository)
  }
)
