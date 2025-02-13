import 'reflect-metadata'

import { Container } from '../utils/di/container'
import { MidazModule } from '../midaz/module/midaz-module'
import { OrganizationUseCaseModule } from './use-cases/organization-module'
import { LedgerUseCaseModule } from './use-cases/ledger-module'
import { PortfolioUseCaseModule } from './use-cases/portfolios-module'
import { AccountUseCaseModule } from './use-cases/account-module'
import { AssetUseCaseModule } from './use-cases/asset-module'
import { SegmentUseCaseModule } from './use-cases/segment-module'
import { CasdoorModule } from '../casdoor/module/casdoor-module'
import { AuthUseCaseModule } from './use-cases/auth-module'
import { LoggerModule } from '../logger/module/logger-module'
import { LoggerApplicationModule } from './logger-application-module'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { TransactionUseCaseModule } from './use-cases/transactions-module'
import { MidazHttpFetchUtils } from '../utils/http-fetch-utils'
import { MidazHttpFetchModule } from './midaz-http-fetch-module'

export const container = new Container()

container.load(CasdoorModule)
container.load(AuthUseCaseModule)
container.load(LoggerModule)
container.load(MidazModule)

container.load(OrganizationUseCaseModule)
container.load(LedgerUseCaseModule)
container.load(PortfolioUseCaseModule)
container.load(AccountUseCaseModule)
container.load(AssetUseCaseModule)
container.load(SegmentUseCaseModule)
container.load(LoggerApplicationModule)

container.load(TransactionUseCaseModule)

container.load(MidazHttpFetchModule)

container
  .bind<MidazRequestContext>(MidazRequestContext)
  .toSelf()
  .inSingletonScope()
