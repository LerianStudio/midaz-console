import { InstrumentsAPIAdapter } from '@/core/adapters/instruments-api-adapter'
import { OryAuthAPIAdapter } from '@/core/adapters/ory-auth-api-adapter'
import {
  CreateOrganization,
  CreateOrganizationUseCase
} from '@/core/application/use-cases/organizations/create-organization-use-case'
import {
  DeleteOrganization,
  DeleteOrganizationUseCase
} from '@/core/application/use-cases/organizations/delete-organization-use-case'
import {
  FetchAllOrganizations,
  FetchAllOrganizationsUseCase
} from '@/core/application/use-cases/organizations/fetch-all-organizations-use-case'
import {
  FetchOrganizationById,
  FetchOrganizationByIdUseCase
} from '@/core/application/use-cases/organizations/fetch-organization-by-id-use-case'
import {
  FetchParentOrganizations,
  FetchParentOrganizationsUseCase
} from '@/core/application/use-cases/organizations/fetch-parent-organizations-use-case'
import {
  UpdateOrganization,
  UpdateOrganizationUseCase
} from '@/core/application/use-cases/organizations/update-organization-use-case'

import {
  CreateLedger,
  CreateLedgerUseCase
} from '@/core/application/use-cases/ledgers/create-ledger-use-case'
import {
  DeleteLedger,
  DeleteLedgerUseCase
} from '@/core/application/use-cases/ledgers/delete-ledger-use-case'
import {
  FetchAllLedgers,
  FetchAllLedgersUseCase
} from '@/core/application/use-cases/ledgers/fetch-all-ledgers-use-case'
import {
  FetchLedgerById,
  FetchLedgerByIdUseCase
} from '@/core/application/use-cases/ledgers/fetch-ledger-by-id-use-case'
import {
  UpdateLedger,
  UpdateLedgerUseCase
} from '@/core/application/use-cases/ledgers/update-ledger-use-case'
import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/ledgers/fetch-all-ledgers-repository'
import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { UpdateLedgerRepository } from '@/core/domain/repositories/ledgers/update-ledger-repository'
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import InstrumentsUseCases from '@/core/useCases/instruments-use-cases'
import OryAuthUseCases from '@/core/useCases/ory-auth-use-cases'
import { Container } from 'inversify'
import { MidazCreateLedgerRepository } from '../midaz/ledgers/midaz-create-ledger-repository'
import { MidazDeleteLedgerRepository } from '../midaz/ledgers/midaz-delete-ledger-repository'
import { MidazFetchAllLedgersRepository } from '../midaz/ledgers/midaz-fetch-all-ledgers-repository'
import { MidazFetchLedgerByIdRepository } from '../midaz/ledgers/midaz-fetch-ledger-by-id-repository'
import { MidazUpdateLedgerRepository } from '../midaz/ledgers/midaz-update-ledger-repository'
import { MidazCreateOrganizationRepository } from '../midaz/organizations/midaz-create-organization-repository'
import { MidazDeleteOrganizationRepository } from '../midaz/organizations/midaz-delete-organization-repository'
import { MidazFetchAllOrganizationsRepository } from '../midaz/organizations/midaz-fetch-all-organizations-repository'
import { MidazFetchOrganizationByIdRepository } from '../midaz/organizations/midaz-fetch-organization-by-id-repository'
import { MidazUpdateOrganizationRepository } from '../midaz/organizations/midaz-update-organization-repository'
import {
  CreateAsset,
  CreateAssetUseCase
} from '@/core/application/use-cases/assets/create-asset-use-case'
import {
  FetchAllAssets,
  FetchAllAssetsUseCase
} from '@/core/application/use-cases/assets/fetch-all-assets-use-case'
import { FetchAssetByIdUseCase } from '@/core/application/use-cases/assets/fetch-asset-by-id-use-case'
import {
  UpdateAsset,
  UpdateAssetUseCase
} from '@/core/application/use-cases/assets/update-asset-use-case'
import {
  DeleteAsset,
  DeleteAssetUseCase
} from '@/core/application/use-cases/assets/delete-asset-use-case'
import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { MidazCreateAssetRepository } from '../midaz/assets/midaz-create-asset-repository'
import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { MidazFetchAllAssetsRepository } from '../midaz/assets/midaz-fetch-all-assets-repository'
import { FetchAssetByIdRepository } from '@/core/domain/repositories/assets/fetch-asset-by-id-repository'
import { MidazFetchAssetByIdRepository } from '../midaz/assets/midaz-fetch-asset-by-id-repository'
import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'
import { MidazUpdateAssetRepository } from '../midaz/assets/midaz-update-asset-repository'
import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'
import { MidazDeleteAssetRepository } from '../midaz/assets/midaz-delete-asset-repository'
import { MidazCreateProductRepository } from '../midaz/product/midaz-create-product-repository'
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import {
  CreateProduct,
  CreateProductUseCase
} from '@/core/application/use-cases/product/create-product-use-case'
import {
  FetchAllProducts,
  FetchAllProductsUseCase
} from '@/core/application/use-cases/product/fetch-all-products-use-case'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { MidazFetchAllProductsRepository } from '../midaz/product/midaz-fetch-all-products-repository'
import { MidazUpdateProductRepository } from '../midaz/product/midaz-update-product-repository'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { MidazDeleteProductRepository } from '../midaz/product/midaz-delete-product-repository'
import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { MidazFetchProductByIdRepository } from '../midaz/product/midaz-fetch-product-by-id-repository'
import {
  UpdateProduct,
  UpdateProductUseCase
} from '@/core/application/use-cases/product/update-product-use-case'
import {
  DeleteProduct,
  DeleteProductUseCase
} from '@/core/application/use-cases/product/delete-product-use-case'
import {
  FetchProductById,
  FetchProductByIdUseCase
} from '@/core/application/use-cases/product/fetch-product-by-id-use-case'
import {
  FetchAllLedgersAssets,
  FetchAllLedgersAssetsUseCase
} from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'

export const Registry = {
  InstrumentsAPIAdapter: Symbol.for('InstrumentsAPIAdapter'),
  OryAuthAPIAdapter: Symbol.for('OryAuthAPIAdapter'),

  /**
   * TODO Remove old Registry
   */
  OryAuthUseCases: Symbol.for('OryAuthUseCases'),
  InstrumentsUseCases: Symbol.for('InstrumentsUseCases'),

  // Organizations

  CreateOrganizationUseCase: Symbol.for('CreateOrganizationUseCase'),
  FetchAllOrganizationsUseCase: Symbol.for('FetchAllOrganizationsUseCase'),
  FetchOrganizationByIdUseCase: Symbol.for('FetchOrganizationByIdUseCase'),
  FetchParentOrganizationsUseCase: Symbol.for(
    'FetchParentOrganizationsUseCase'
  ),
  UpdateOrganizationUseCase: Symbol.for('UpdateOrganizationUseCase'),
  DeleteOrganizationUseCase: Symbol.for('DeleteOrganizationUseCase'),

  CreateOrganizationRepository: Symbol.for('CreateOrganizationRepository'),
  FetchAllOrganizationsRepository: Symbol.for(
    'FetchAllOrganizationsRepository'
  ),
  FetchOrganizationByIdRepository: Symbol.for(
    'FetchOrganizationByIdRepository'
  ),
  DeleteOrganizationRepository: Symbol.for('DeleteOrganizationRepository'),
  UpdateOrganizationRepository: Symbol.for('UpdateOrganizationRepository'),

  // Ledgers

  CreateLedgerUseCase: Symbol.for('CreateLedgerUseCase'),
  FetchAllLedgersUseCase: Symbol.for('FetchAllLedgersUseCase'),
  FetchLedgerByIdUseCase: Symbol.for('FetchLedgerByIdUseCase'),
  UpdateLedgerUseCase: Symbol.for('UpdateLedgerUseCase'),
  DeleteLedgerUseCase: Symbol.for('DeleteLedgerUseCase'),

  CreateLedgerRepository: Symbol.for('CreateLedgerRepository'),
  FetchAllLedgersRepository: Symbol.for('FetchAllLedgersRepository'),
  FetchLedgerByIdRepository: Symbol.for('FetchLedgerByIdRepository'),
  UpdateLedgerRepository: Symbol.for('UpdateLedgerRepository'),
  DeleteLedgerRepository: Symbol.for('DeleteLedgerRepository'),

  // Ledgers-Assets
  FetchAllLedgersAssetsUseCase: Symbol.for('FetchAllLedgersAssetsUseCase'),

  // Assets
  CreateAssetUseCase: Symbol.for('CreateAssetUseCase'),
  FetchAllAssetsUseCase: Symbol.for('FetchAllAssetsUseCase'),
  FetchAssetByIdUseCase: Symbol.for('FetchAssetByIdUseCase'),
  UpdateAssetUseCase: Symbol.for('UpdateAssetUseCase'),
  DeleteAssetUseCase: Symbol.for('DeleteAssetUseCase'),

  CreateAssetRepository: Symbol.for('CreateAssetRepository'),
  FetchAllAssetsRepository: Symbol.for('FetchAllAssetsRepository'),
  FetchAssetByIdRepository: Symbol.for('FetchAssetByIdRepository'),
  UpdateAssetRepository: Symbol.for('UpdateAssetRepository'),
  DeleteAssetRepository: Symbol.for('DeleteAssetRepository'),

  // Products

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

export const container = new Container()

// External API Adapters

container
  .bind<InstrumentsAPIAdapter>(Registry.InstrumentsAPIAdapter)
  .toDynamicValue((context) => {
    return new InstrumentsAPIAdapter()
  })
container
  .bind<OryAuthAPIAdapter>(Registry.OryAuthAPIAdapter)
  .toDynamicValue((context) => {
    return new OryAuthAPIAdapter()
  })

// Use Cases

container
  .bind<InstrumentsUseCases>(Registry.InstrumentsUseCases)
  .toDynamicValue((context) => {
    return new InstrumentsUseCases(
      context.container.get(Registry.InstrumentsAPIAdapter)
    )
  })
container
  .bind<OryAuthUseCases>(Registry.OryAuthUseCases)
  .toDynamicValue((context) => {
    return new OryAuthUseCases(
      context.container.get(Registry.OryAuthAPIAdapter)
    )
  })

/**
 * New Containers
 */

// Organizations

container
  .bind<CreateOrganizationRepository>(Registry.CreateOrganizationRepository)
  .toConstantValue(new MidazCreateOrganizationRepository())

container
  .bind<FetchAllOrganizationsRepository>(
    Registry.FetchAllOrganizationsRepository
  )
  .toConstantValue(new MidazFetchAllOrganizationsRepository())

container
  .bind<FetchOrganizationByIdRepository>(
    Registry.FetchOrganizationByIdRepository
  )
  .toConstantValue(new MidazFetchOrganizationByIdRepository())

container
  .bind<DeleteOrganizationRepository>(Registry.DeleteOrganizationRepository)
  .toConstantValue(new MidazDeleteOrganizationRepository())

container
  .bind<UpdateOrganizationRepository>(Registry.UpdateOrganizationRepository)
  .toConstantValue(new MidazUpdateOrganizationRepository())

container
  .bind<CreateOrganization>(Registry.CreateOrganizationUseCase)
  .toDynamicValue((context) => {
    return new CreateOrganizationUseCase(
      context.container.get(Registry.CreateOrganizationRepository)
    )
  })

container
  .bind<FetchAllOrganizations>(Registry.FetchAllOrganizationsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllOrganizationsUseCase(
      context.container.get(Registry.FetchAllOrganizationsRepository)
    )
  })

container
  .bind<FetchOrganizationById>(Registry.FetchOrganizationByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchOrganizationByIdUseCase(
      context.container.get(Registry.FetchOrganizationByIdRepository)
    )
  })

container
  .bind<FetchParentOrganizations>(Registry.FetchParentOrganizationsUseCase)
  .toDynamicValue((context) => {
    return new FetchParentOrganizationsUseCase(
      context.container.get(Registry.FetchOrganizationByIdRepository)
    )
  })

container
  .bind<UpdateOrganization>(Registry.UpdateOrganizationUseCase)
  .toDynamicValue((context) => {
    return new UpdateOrganizationUseCase(
      context.container.get(Registry.UpdateOrganizationRepository)
    )
  })

container
  .bind<DeleteOrganization>(Registry.DeleteOrganizationUseCase)
  .toDynamicValue((context) => {
    return new DeleteOrganizationUseCase(
      context.container.get(Registry.DeleteOrganizationRepository)
    )
  })

// Ledgers

container
  .bind<CreateLedgerRepository>(Registry.CreateLedgerRepository)
  .toConstantValue(new MidazCreateLedgerRepository())

container
  .bind<CreateLedger>(Registry.CreateLedgerUseCase)
  .toDynamicValue((context) => {
    return new CreateLedgerUseCase(
      context.container.get(Registry.CreateLedgerRepository)
    )
  })

container
  .bind<FetchAllLedgersRepository>(Registry.FetchAllLedgersRepository)
  .toConstantValue(new MidazFetchAllLedgersRepository())

container
  .bind<FetchAllLedgers>(Registry.FetchAllLedgersUseCase)
  .toDynamicValue((context) => {
    return new FetchAllLedgersUseCase(
      context.container.get(Registry.FetchAllLedgersRepository)
    )
  })

container
  .bind<FetchLedgerByIdRepository>(Registry.FetchLedgerByIdRepository)
  .toConstantValue(new MidazFetchLedgerByIdRepository())

container
  .bind<FetchLedgerById>(Registry.FetchLedgerByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchLedgerByIdUseCase(
      context.container.get(Registry.FetchLedgerByIdRepository)
    )
  })

container
  .bind<UpdateLedgerRepository>(Registry.UpdateLedgerRepository)
  .toConstantValue(new MidazUpdateLedgerRepository())

container
  .bind<UpdateLedger>(Registry.UpdateLedgerUseCase)
  .toDynamicValue((context) => {
    return new UpdateLedgerUseCase(
      context.container.get(Registry.UpdateLedgerRepository)
    )
  })

container
  .bind<DeleteLedgerRepository>(Registry.DeleteLedgerRepository)
  .toConstantValue(new MidazDeleteLedgerRepository())

container
  .bind<DeleteLedger>(Registry.DeleteLedgerUseCase)
  .toDynamicValue((context) => {
    return new DeleteLedgerUseCase(
      context.container.get(Registry.DeleteLedgerRepository)
    )
  })

container
  .bind<CreateAssetRepository>(Registry.CreateAssetRepository)
  .toConstantValue(new MidazCreateAssetRepository())

container
  .bind<CreateAsset>(Registry.CreateAssetUseCase)
  .toDynamicValue((context) => {
    return new CreateAssetUseCase(
      context.container.get(Registry.CreateAssetRepository)
    )
  })

container
  .bind<FetchAllAssetsRepository>(Registry.FetchAllAssetsRepository)
  .toConstantValue(new MidazFetchAllAssetsRepository())

container
  .bind<FetchAllAssets>(Registry.FetchAllAssetsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllAssetsUseCase(
      context.container.get(Registry.FetchAllAssetsRepository)
    )
  })

container
  .bind<FetchAssetByIdRepository>(Registry.FetchAssetByIdRepository)
  .toConstantValue(new MidazFetchAssetByIdRepository())

container
  .bind<FetchAssetByIdUseCase>(Registry.FetchAssetByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchAssetByIdUseCase(
      context.container.get(Registry.FetchAssetByIdRepository)
    )
  })

container
  .bind<UpdateAssetRepository>(Registry.UpdateAssetRepository)
  .toConstantValue(new MidazUpdateAssetRepository())

container
  .bind<UpdateAsset>(Registry.UpdateAssetUseCase)
  .toDynamicValue((context) => {
    return new UpdateAssetUseCase(
      context.container.get(Registry.UpdateAssetRepository)
    )
  })

container
  .bind<DeleteAssetRepository>(Registry.DeleteAssetRepository)
  .toConstantValue(new MidazDeleteAssetRepository())

container
  .bind<DeleteAsset>(Registry.DeleteAssetUseCase)
  .toDynamicValue((context) => {
    return new DeleteAssetUseCase(
      context.container.get(Registry.DeleteAssetRepository)
    )
  })

//Ledgers-Assets
container
  .bind<FetchAllLedgersAssets>(Registry.FetchAllLedgersAssetsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllLedgersAssetsUseCase(
      context.container.get(Registry.FetchAllLedgersRepository),
      context.container.get(Registry.FetchAllAssetsRepository)
    )
  })

// Products

container
  .bind<CreateProductRepository>(Registry.CreateProductRepository)
  .toConstantValue(new MidazCreateProductRepository())

container
  .bind<CreateProduct>(Registry.CreateProductUseCase)
  .toDynamicValue((context) => {
    return new CreateProductUseCase(
      context.container.get(Registry.CreateProductRepository)
    )
  })

container
  .bind<FetchAllProductsRepository>(Registry.FetchAllProductsRepository)
  .toConstantValue(new MidazFetchAllProductsRepository())

container
  .bind<FetchAllProducts>(Registry.FetchAllProductsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllProductsUseCase(
      context.container.get(Registry.FetchAllProductsRepository)
    )
  })

container
  .bind<UpdateProductRepository>(Registry.UpdateProductRepository)
  .toConstantValue(new MidazUpdateProductRepository())

container
  .bind<UpdateProduct>(Registry.UpdateProductUseCase)
  .toDynamicValue((context) => {
    return new UpdateProductUseCase(
      context.container.get(Registry.UpdateProductRepository)
    )
  })

container
  .bind<DeleteProductRepository>(Registry.DeleteProductRepository)
  .toConstantValue(new MidazDeleteProductRepository())

container
  .bind<DeleteProduct>(Registry.DeleteProductUseCase)
  .toDynamicValue((context) => {
    return new DeleteProductUseCase(
      context.container.get(Registry.DeleteProductRepository)
    )
  })

container
  .bind<FetchProductByIdRepository>(Registry.FetchProductByIdRepository)
  .toConstantValue(new MidazFetchProductByIdRepository())

container
  .bind<FetchProductById>(Registry.FetchProductByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchProductByIdUseCase(
      context.container.get(Registry.FetchProductByIdRepository)
    )
  })
