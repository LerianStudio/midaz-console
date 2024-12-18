import 'reflect-metadata'

import { Container } from '../utils/di/container'
import { MidazModule } from '../midaz/module/midaz-module'
import { OrganizationUseCaseModule } from './use-cases/organization-module'
import { LedgerUseCaseModule } from './use-cases/ledger-module'
import { PortfolioUseCaseModule } from './use-cases/portfolios-module'
import { AccountUseCaseModule } from './use-cases/account-module'
import { AssetUseCaseModule } from './use-cases/asset-module'
import { ProductUseCaseModule } from './use-cases/product-module'
import { CasdoorModule } from '../casdoor/module/casdoor-module'
import { AuthUseCaseModule } from './use-cases/auth-module'
import { TransactionUseCaseModule } from './use-cases/transactions-module'

export const container = new Container()

container.load(CasdoorModule)
container.load(AuthUseCaseModule)

container.load(MidazModule)
container.load(OrganizationUseCaseModule)
container.load(LedgerUseCaseModule)
container.load(PortfolioUseCaseModule)
container.load(AccountUseCaseModule)
container.load(AssetUseCaseModule)
container.load(ProductUseCaseModule)
container.load(TransactionUseCaseModule)
