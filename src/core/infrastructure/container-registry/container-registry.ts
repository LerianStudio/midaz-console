import { Container } from 'inversify'

import {
  FetchAllLedgersAssets,
  FetchAllLedgersAssetsUseCase
} from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'

import {
  FetchAllPortfoliosAccounts,
  FetchAllPortfoliosAccountsUseCase
} from '@/core/application/use-cases/portfolios-accounts/fetch-portfolios-accounts-use-case'
import { AuthModule, AuthRegistry } from './auth-module'
import { OrganizationModule, OrganizationRegistry } from './organization-module'
import { LedgerModule, LedgerRegistry } from './ledger-module'
import { PortfolioModule, PortfolioRegistry } from './portfolio-module'
import { AccountModule, AccountRegistry } from './account-module'
import { AssetModule, AssetRegistry } from './asset-module'
import { ProductRegistry, ProductModule } from './product-module'

export const Registry = {
  ...AuthRegistry,
  ...OrganizationRegistry,
  ...LedgerRegistry,

  // Ledgers-Assets
  FetchAllLedgersAssetsUseCase: Symbol.for('FetchAllLedgersAssetsUseCase'),

  ...PortfolioRegistry,
  ...AccountRegistry,
  ...AssetRegistry,
  ...ProductRegistry,

  // Portfolio-Accounts
  FetchAllPortfoliosAccountsUseCase: Symbol.for(
    'FetchAllPortfoliosAccountsUseCase'
  )
}

export const container = new Container()

container.load(AuthModule)
container.load(OrganizationModule)
container.load(LedgerModule)
container.load(PortfolioModule)
container.load(AccountModule)
container.load(AssetModule)

//Ledgers-Assets
container
  .bind<FetchAllLedgersAssets>(Registry.FetchAllLedgersAssetsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllLedgersAssetsUseCase(
      context.container.get(Registry.FetchAllLedgersRepository),
      context.container.get(Registry.FetchAllAssetsRepository)
    )
  })

container.load(ProductModule)

//Portfolio-Accounts
container
  .bind<FetchAllPortfoliosAccounts>(Registry.FetchAllPortfoliosAccountsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllPortfoliosAccountsUseCase(
      context.container.get(Registry.FetchAllPortfoliosRepository),
      context.container.get(Registry.FetchAllAccountsRepository)
    )
  })
