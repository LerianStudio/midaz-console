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
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { ContainerModule, interfaces } from 'inversify'
import { MidazCreateProductRepository } from '../midaz/product/midaz-create-product-repository'
import { MidazFetchAllProductsRepository } from '../midaz/product/midaz-fetch-all-products-repository'
import { MidazUpdateProductRepository } from '../midaz/product/midaz-update-product-repository'
import { MidazDeleteProductRepository } from '../midaz/product/midaz-delete-product-repository'
import { MidazFetchProductByIdRepository } from '../midaz/product/midaz-fetch-product-by-id-repository'

export const ProductRegistry = {
  CreateProductUseCase: Symbol.for('CreateProductUseCase'),
  FetchAllProductsUseCase: Symbol.for('FetchAllProductsUseCase'),
  FetchProductByIdUseCase: Symbol.for('FetchProductByIdUseCase'),
  UpdateProductUseCase: Symbol.for('UpdateProductUseCase'),
  DeleteProductUseCase: Symbol.for('DeleteProductUseCase'),

  CreateProductRepository: Symbol.for('CreateProductRepository'),
  FetchAllProductsRepository: Symbol.for('FetchAllProductsRepository'),
  FetchProductByIdRepository: Symbol.for('FetchProductByIdRepository'),
  UpdateProductRepository: Symbol.for('UpdateProductRepository'),
  DeleteProductRepository: Symbol.for('DeleteProductRepository')
}

export const ProductsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreateProductRepository>(
    ProductRegistry.CreateProductRepository
  ).toConstantValue(new MidazCreateProductRepository())

  bind<CreateProduct>(ProductRegistry.CreateProductUseCase).toDynamicValue(
    (context) => {
      return new CreateProductUseCase(
        context.container.get(ProductRegistry.CreateProductRepository)
      )
    }
  )

  bind<FetchAllProductsRepository>(
    ProductRegistry.FetchAllProductsRepository
  ).toConstantValue(new MidazFetchAllProductsRepository())

  bind<FetchAllProducts>(
    ProductRegistry.FetchAllProductsUseCase
  ).toDynamicValue((context) => {
    return new FetchAllProductsUseCase(
      context.container.get(ProductRegistry.FetchAllProductsRepository)
    )
  })

  bind<UpdateProductRepository>(
    ProductRegistry.UpdateProductRepository
  ).toConstantValue(new MidazUpdateProductRepository())

  bind<UpdateProduct>(ProductRegistry.UpdateProductUseCase).toDynamicValue(
    (context) => {
      return new UpdateProductUseCase(
        context.container.get(ProductRegistry.UpdateProductRepository)
      )
    }
  )

  bind<DeleteProductRepository>(
    ProductRegistry.DeleteProductRepository
  ).toConstantValue(new MidazDeleteProductRepository())

  bind<DeleteProduct>(ProductRegistry.DeleteProductUseCase).toDynamicValue(
    (context) => {
      return new DeleteProductUseCase(
        context.container.get(ProductRegistry.DeleteProductRepository)
      )
    }
  )

  bind<FetchProductByIdRepository>(
    ProductRegistry.FetchProductByIdRepository
  ).toConstantValue(new MidazFetchProductByIdRepository())

  bind<FetchProductById>(
    ProductRegistry.FetchProductByIdUseCase
  ).toDynamicValue((context) => {
    return new FetchProductByIdUseCase(
      context.container.get(ProductRegistry.FetchProductByIdRepository)
    )
  })
})
