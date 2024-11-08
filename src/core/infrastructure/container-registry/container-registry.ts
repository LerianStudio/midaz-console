import 'reflect-metadata'
import {
  FetchAllPortfoliosAccounts,
  FetchAllPortfoliosAccountsUseCase
} from '@/core/application/use-cases/portfolios-accounts/fetch-portfolios-accounts-use-case'
import { AuthModule, AuthRegistry } from './auth-module'
import { PortfolioModule, PortfolioRegistry } from './portfolio-module'
import { AccountModule, AccountRegistry } from './account-module'
import { AssetModule, AssetRegistry } from './asset-module'
import { ProductRegistry, ProductModule } from './product-module'

import { Container } from '../utils/di/container'
import { MidazModule } from '../midaz/module/midaz-module'
import { OrganizationUseCaseModule } from './use-cases/organization-module'
import { LedgerUseCaseModule } from './use-cases/ledger-module'

import {
  FetchAllLedgersAssets,
  FetchAllLedgersAssetsUseCase
} from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'
import { MidazFetchAllLedgersRepository } from '../midaz/ledgers/midaz-fetch-all-ledgers-repository'
import { MidazFetchAllAssetsRepository } from '../midaz/assets/midaz-fetch-all-assets-repository'
import { MidazFetchAllPortfoliosRepository } from '../midaz/portfolios/midaz-fetch-all-portfolio-repository'
import { MidazFetchAllAccountsRepository } from '../midaz/accounts/midaz-fetch-all-accounts-repository'

export const Registry = {
  ...AuthRegistry,
  ...PortfolioRegistry,
  ...AccountRegistry,
  ...AssetRegistry,
  ...ProductRegistry,

  // Portfolio-Accounts
  FetchAllPortfoliosAccountsUseCase: Symbol.for(
    'FetchAllPortfoliosAccountsUseCase'
  ),
  FetchAllLedgersAssetsUseCase: Symbol.for('FetchAllLedgersAssetsUseCase')
}

export const container = new Container()

container.load(MidazModule)
container.load(OrganizationUseCaseModule)
container.load(LedgerUseCaseModule)

container.container.load(AuthModule)
container.container.load(PortfolioModule)
container.container.load(AccountModule)
container.container.load(AssetModule)
container.container.load(ProductModule)

container
  .bind<FetchAllLedgersAssets>(Registry.FetchAllLedgersAssetsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllLedgersAssetsUseCase(
      new MidazFetchAllLedgersRepository(),
      new MidazFetchAllAssetsRepository()
    )
  })

//Portfolio-Accounts
container
  .bind<FetchAllPortfoliosAccounts>(Registry.FetchAllPortfoliosAccountsUseCase)
  .toDynamicValue((context) => {
    return new FetchAllPortfoliosAccountsUseCase(
      new MidazFetchAllPortfoliosRepository(),
      new MidazFetchAllAccountsRepository()
    )
  })
