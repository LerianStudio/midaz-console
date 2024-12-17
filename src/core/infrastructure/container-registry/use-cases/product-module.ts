import { Container, ContainerModule } from '../../utils/di/container'

import {
  CreateProduct,
  CreateProductUseCase
} from '@/core/application/use-cases/product/create-product-use-case'
import {
  DeleteProduct,
  DeleteProductUseCase
} from '@/core/application/use-cases/product/delete-product-use-case'
import {
  FetchAllProducts,
  FetchAllProductsUseCase
} from '@/core/application/use-cases/product/fetch-all-products-use-case'
import {
  FetchProductById,
  FetchProductByIdUseCase
} from '@/core/application/use-cases/product/fetch-product-by-id-use-case'
import {
  UpdateProduct,
  UpdateProductUseCase
} from '@/core/application/use-cases/product/update-product-use-case'

export const ProductUseCaseModule = new ContainerModule(
  (container: Container) => {
    container.bind<CreateProduct>(CreateProductUseCase).toSelf()
    container.bind<FetchAllProducts>(FetchAllProductsUseCase).toSelf()
    container.bind<UpdateProduct>(UpdateProductUseCase).toSelf()
    container.bind<DeleteProduct>(DeleteProductUseCase).toSelf()
    container.bind<FetchProductById>(FetchProductByIdUseCase).toSelf()
  }
)
