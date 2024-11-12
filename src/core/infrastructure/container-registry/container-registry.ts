import 'reflect-metadata'
import {
  FetchAllPortfoliosAccounts,
  FetchAllPortfoliosAccountsUseCase
} from '@/core/application/use-cases/portfolios-accounts/fetch-portfolios-accounts-use-case'
import { AuthModule, AuthRegistry } from './auth-module'
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
import { PortfolioUseCaseModule } from './use-cases/portfolios-module'
import { AccountUseCaseModule } from './use-cases/account-module'
import { AssetUseCaseModule } from './use-cases/asset-module'

export const Registry = {
  ...AuthRegistry,
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
container.load(PortfolioUseCaseModule)
container.load(AccountUseCaseModule)
container.load(AssetUseCaseModule)

container.container.load(AuthModule)
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
