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
  CreateAsset,
  CreateAssetUseCase
} from '@/core/application/use-cases/assets/create-asset-use-case'
import {
  DeleteAsset,
  DeleteAssetUseCase
} from '@/core/application/use-cases/assets/delete-asset-use-case'
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
  AuthLogin,
  AuthLoginUseCase
} from '@/core/application/use-cases/auth/auth-login-use-case'
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
import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'
import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { FetchAssetByIdRepository } from '@/core/domain/repositories/assets/fetch-asset-by-id-repository'
import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'
import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
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
import { CreateProductRepository } from '@/core/domain/repositories/products/create-product-repository'
import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { FetchAllProductsRepository } from '@/core/domain/repositories/products/fetch-all-products-repository'
import { FetchProductByIdRepository } from '@/core/domain/repositories/products/fetch-product-by-id-repository'
import { UpdateProductRepository } from '@/core/domain/repositories/products/update-product-repository'
import { Container } from 'inversify'
import { CasdoorAuthLoginRepository } from '../casdoor/casdoor-auth-login-repository'
import { MidazCreateAssetRepository } from '../midaz/assets/midaz-create-asset-repository'
import { MidazDeleteAssetRepository } from '../midaz/assets/midaz-delete-asset-repository'
import { MidazFetchAllAssetsRepository } from '../midaz/assets/midaz-fetch-all-assets-repository'
import { MidazFetchAssetByIdRepository } from '../midaz/assets/midaz-fetch-asset-by-id-repository'
import { MidazUpdateAssetRepository } from '../midaz/assets/midaz-update-asset-repository'
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
import { MidazCreateProductRepository } from '../midaz/product/midaz-create-product-repository'
import { MidazDeleteProductRepository } from '../midaz/product/midaz-delete-product-repository'
import { MidazFetchAllProductsRepository } from '../midaz/product/midaz-fetch-all-products-repository'
import { MidazFetchProductByIdRepository } from '../midaz/product/midaz-fetch-product-by-id-repository'
import { MidazUpdateProductRepository } from '../midaz/product/midaz-update-product-repository'
import {
  CreatePortfolio,
  CreatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/create-portfolio-use-case'
import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import { MidazCreatePortfolioRepository } from '../midaz/portfolios/midaz-create-portfolio-repository'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { MidazFetchAllPortfoliosRepository } from '../midaz/portfolios/midaz-fetch-all-portfolio-repository'
import {
  FetchAllPortfolios,
  FetchAllPortfoliosUseCase
} from '@/core/application/use-cases/portfolios/fetch-all-portfolio-use-case'

import { UpdatePortfolioRepository } from '@/core/domain/repositories/portfolios/update-portfolio-repository'
import { MidazUpdatePortfolioRepository } from '../midaz/portfolios/midaz-update-portfolio-repository'
import {
  UpdatePortfolio,
  UpdatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/update-portfolio-use-case'
import { DeletePortfolioRepository } from '@/core/domain/repositories/portfolios/delete-portfolio-repository'
import { MidazDeletePortfolioRepository } from '../midaz/portfolios/midaz-delete-portfolio-repository'
import {
  DeletePortfolio,
  DeletePortfolioUseCase
} from '@/core/application/use-cases/portfolios/delete-portfolio-use-case'
import { FetchPortfolioByIdRepository } from '@/core/domain/repositories/portfolios/fetch-portfolio-by-id-repository'
import { MidazFetchPortfolioByIdRepository } from '../midaz/portfolios/midaz-fetch-portfolio-by-id-repository'
import {
  FetchPortfolioById,
  FetchPortfolioByIdUseCase
} from '@/core/application/use-cases/portfolios/fetch-portfolio-by-id-use-case'
import {
  FetchAllLedgersAssets,
  FetchAllLedgersAssetsUseCase
} from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'
import { CasdoorAuthPermissionRepository } from '../casdoor/casdoor-auth-permission-repository'
import {
  AuthPermission,
  AuthPermissionUseCase
} from '@/core/application/use-cases/auth/auth-permission-use-case'

import { FetchAllAccountsRepository } from '@/core/domain/repositories/accounts/fetch-all-accounts-repository'
import { MidazFetchAllAccountsRepository } from '../midaz/accounts/midaz-fetch-all-accounts-repository'
import {
  FetchAllAccounts,
  FetchAllAccountsUseCase
} from '@/core/application/use-cases/accounts/fetch-all-account-use-case'
import { CreateAccountsRepository } from '@/core/domain/repositories/accounts/create-accounts-repository'
import {
  CreateAccount,
  CreateAccountUseCase
} from '@/core/application/use-cases/accounts/create-account-use-case'
import { MidazCreateAccountRepository } from '../midaz/accounts/midaz-create-accounts-repository'
import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { MidazFetchAccountByIdRepository } from '../midaz/accounts/midaz-fetch-account-by-id-repository'
import {
  FetchAccountById,
  FetchAccountByIdUseCase
} from '@/core/application/use-cases/accounts/fetch-account-by-id-use-case'
import { UpdateAccountsRepository } from '@/core/domain/repositories/accounts/update-accounts-repository'
import { MidazUpdateAccountsRepository } from '../midaz/accounts/midaz-update-accounts-repository'
import {
  UpdateAccount,
  UpdateAccountUseCase
} from '@/core/application/use-cases/accounts/update-account-use-case'
import { DeleteAccountsRepository } from '@/core/domain/repositories/accounts/delete-accounts-repository'
import { MidazDeleteAccountsRepository } from '../midaz/accounts/midaz-delete-accounts-repository'
import {
  DeleteAccount,
  DeleteAccountUseCase
} from '@/core/application/use-cases/accounts/delete-account-use-case'
import {
  FetchAllPortfoliosAccounts,
  FetchAllPortfoliosAccountsUseCase
} from '@/core/application/use-cases/portfolios-accounts/fetch-portfolios-accounts-use-case'

export const Registry = {
  AuthLoginRepository: Symbol.for('AuthLoginRepository'),
  AuthLoginUseCase: Symbol.for('AuthLoginUseCase'),
  AuthPermissionRepository: Symbol.for('AuthPermissionRepository'),
  AuthPermissionUseCase: Symbol.for('AuthPermissionUseCase'),

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

  // Portfolio
  PortfolioUseCases: Symbol.for('PortfolioUseCases'),

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
  DeleteProductRepository: Symbol.for('DeleteProductRepository'),

  CreatePortfolioSymbolUseCase: Symbol.for('CreatePortfolioSymbolUseCase'),
  UpdatePortfolioUseCase: Symbol.for('UpdatePortfolioUseCase'),
  CreatePortfolioUseCase: Symbol.for('CreatePortfolioUseCase'),
  FetchAllPortfoliosUseCase: Symbol.for('FetchAllPortfoliosUseCase'),
  DeletePortfolioUseCase: Symbol.for('DeletePortfolioUseCase'),

  CreatePortfolioSymbolRepository: Symbol.for(
    'CreatePortfolioSymbolRepository'
  ),
  CreatePortfolioRepository: Symbol.for('CreatePortfolioRepository'),
  FetchAllPortfoliosRepository: Symbol.for('FetchAllPortfoliosRepository'),
  UpdatePortfolioRepository: Symbol.for('UpdatePortfolioRepository'),
  DeletePortfolioRepository: Symbol.for('DeletePortfolioRepository'),

  FetchPortfolioByIdUseCase: Symbol.for('FetchPortfolioByIdUseCase'),
  FetchPortfolioByIdRepository: Symbol.for('FetchPortfolioByIdRepository'),

  // Account Symbols
  FetchAccountSymbolUseCase: Symbol.for('FetchAccountSymbolUseCase'),
  FetchAccountSymbolRepository: Symbol.for('FetchAccountSymbolRepository'),

  // Accounts
  FetchAllAccountsUseCase: Symbol.for('FetchAllAccountsUseCase'),
  FetchAllAccountsRepository: Symbol.for('FetchAllAccountsRepository'),
  CreateAccountsRepository: Symbol.for('CreateAccountsRepository'),
  CreateAccountUseCase: Symbol.for('CreateAccountUseCase'),
  CreateAccountSymbolRepository: Symbol.for('CreateAccountSymbolRepository'),
  FetchAccountByIdRepository: Symbol.for('FetchAccountByIdRepository'),
  FetchAccountByIdUseCase: Symbol.for('FetchAccountByIdUseCase'),
  UpdateAccountRepository: Symbol.for('UpdateAccountRepository'),
  UpdateAccountUseCase: Symbol.for('UpdateAccountUseCase'),
  DeleteAccountRepository: Symbol.for('DeleteAccountRepository'),
  DeleteAccountUseCase: Symbol.for('DeleteAccountUseCase'),

  // Portfolio-Accounts
  FetchAllPortfoliosAccountsUseCase: Symbol.for(
    'FetchAllPortfoliosAccountsUseCase'
  )
}

export const container = new Container()

// Auth

container
  .bind<AuthLoginRepository>(Registry.AuthLoginRepository)
  .toConstantValue(new CasdoorAuthLoginRepository())

container
  .bind<AuthLogin>(Registry.AuthLoginUseCase)
  .toDynamicValue((context) => {
    return new AuthLoginUseCase(
      context.container.get(Registry.AuthLoginRepository)
    )
  })

container
  .bind<AuthPermissionRepository>(Registry.AuthPermissionRepository)
  .toConstantValue(new CasdoorAuthPermissionRepository())

container
  .bind<AuthPermission>(Registry.AuthPermissionUseCase)
  .toDynamicValue((context) => {
    return new AuthPermissionUseCase(
      context.container.get(Registry.AuthPermissionRepository)
    )
  })

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

container
  .bind<CreatePortfolioRepository>(Registry.CreatePortfolioSymbolRepository)
  .toConstantValue(new MidazCreatePortfolioRepository())

container
  .bind<CreatePortfolio>(Registry.CreatePortfolioSymbolUseCase)
  .toDynamicValue((context) => {
    return new CreatePortfolioUseCase(
      context.container.get(Registry.CreatePortfolioSymbolRepository)
    )
  })

container
  .bind<CreatePortfolioRepository>(Registry.CreatePortfolioRepository)
  .toConstantValue(new MidazCreatePortfolioRepository())

container
  .bind<CreatePortfolio>(Registry.CreatePortfolioUseCase)
  .toDynamicValue((context) => {
    return new CreatePortfolioUseCase(
      context.container.get(Registry.CreatePortfolioRepository)
    )
  })

container
  .bind<FetchAllPortfoliosRepository>(Registry.FetchAllPortfoliosRepository)
  .toConstantValue(new MidazFetchAllPortfoliosRepository())

container
  .bind<FetchAllPortfolios>(Registry.FetchAllPortfoliosUseCase)
  .toDynamicValue((context) => {
    return new FetchAllPortfoliosUseCase(
      context.container.get(Registry.FetchAllPortfoliosRepository)
    )
  })

container
  .bind<UpdatePortfolioRepository>(Registry.UpdatePortfolioRepository)
  .toConstantValue(new MidazUpdatePortfolioRepository())

container
  .bind<UpdatePortfolio>(Registry.UpdatePortfolioUseCase)
  .toDynamicValue((context) => {
    return new UpdatePortfolioUseCase(
      context.container.get(Registry.UpdatePortfolioRepository)
    )
  })

container
  .bind<DeletePortfolioRepository>(Registry.DeletePortfolioRepository)
  .toConstantValue(new MidazDeletePortfolioRepository())

container
  .bind<DeletePortfolio>(Registry.DeletePortfolioUseCase)
  .toDynamicValue((context) => {
    return new DeletePortfolioUseCase(
      context.container.get(Registry.DeletePortfolioRepository)
    )
  })

container
  .bind<FetchPortfolioByIdRepository>(Registry.FetchPortfolioByIdRepository)
  .toConstantValue(new MidazFetchPortfolioByIdRepository())

container
  .bind<FetchPortfolioById>(Registry.FetchPortfolioByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchPortfolioByIdUseCase(
      context.container.get(Registry.FetchPortfolioByIdRepository)
    )
  })

// Accounts

container
  .bind<FetchAllAccountsRepository>(Registry.FetchAllAccountsRepository)
  .toConstantValue(new MidazFetchAllAccountsRepository())

container
  .bind<FetchAllAccounts>(Registry.FetchAllAccountsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllAccountsUseCase(
      context.container.get(Registry.FetchAllAccountsRepository)
    )
  })

container
  .bind<CreateAccountsRepository>(Registry.CreateAccountsRepository)
  .toConstantValue(new MidazCreateAccountRepository())

container
  .bind<CreateAccount>(Registry.CreateAccountUseCase)
  .toDynamicValue((context) => {
    return new CreateAccountUseCase(
      context.container.get(Registry.CreateAccountsRepository)
    )
  })

// Fetch Account By Id
container
  .bind<FetchAccountByIdRepository>(Registry.FetchAccountByIdRepository)
  .toConstantValue(new MidazFetchAccountByIdRepository())

container
  .bind<FetchAccountById>(Registry.FetchAccountByIdUseCase)
  .toDynamicValue((context) => {
    return new FetchAccountByIdUseCase(
      context.container.get(Registry.FetchAccountByIdRepository)
    )
  })

// Update Account
container
  .bind<UpdateAccountsRepository>(Registry.UpdateAccountRepository)
  .toConstantValue(new MidazUpdateAccountsRepository())

container
  .bind<UpdateAccount>(Registry.UpdateAccountUseCase)
  .toDynamicValue((context) => {
    return new UpdateAccountUseCase(
      context.container.get(Registry.UpdateAccountRepository)
    )
  })

// Delete Account
container
  .bind<DeleteAccountsRepository>(Registry.DeleteAccountRepository)
  .toConstantValue(new MidazDeleteAccountsRepository())

container
  .bind<DeleteAccount>(Registry.DeleteAccountUseCase)
  .toDynamicValue((context) => {
    return new DeleteAccountUseCase(
      context.container.get(Registry.DeleteAccountRepository)
    )
  })

//Portfolio-Accounts
container
  .bind<FetchAllPortfoliosAccounts>(Registry.FetchAllPortfoliosAccountsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllPortfoliosAccountsUseCase(
      context.container.get(Registry.FetchAllPortfoliosRepository),
      context.container.get(Registry.FetchAllAccountsRepository)
    )
  })
