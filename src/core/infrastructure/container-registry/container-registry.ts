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
import { LoggerModule } from '../logger/module/logger-module'
import { LoggerApplicationModule } from './logger-application-module'
import { MIDAZ_ID_KEY } from '../logger/decorators/midaz-id'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { TransactionUseCaseModule } from './use-cases/transactions-module'
import { MidazHttpFetchUtils } from '../utils/http-fetch-utils'
import { containerRequest } from './container-request-registry'

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
container.load(ProductUseCaseModule)
container.load(LoggerApplicationModule)

// container.bind<MidazRequestContext>(MIDAZ_ID_KEY).to(MidazRequestContext)
container.bind<MidazHttpFetchUtils>(MidazHttpFetchUtils).to(MidazHttpFetchUtils)
// const loggerMiddleware: interfaces.Middleware = (next) => (args) => {
//   console.log(`[Inversify] Resolving: ${args.serviceIdentifier.toString()}`)
//   const result = next(args)
//   console.log('[Inversify] Result: ', result)
//   console.log(`[Inversify] Resolved: ${args.serviceIdentifier.toString()}`)
//   return result
// }

// container.container.apply  Middleware(loggerMiddleware)
container.load(TransactionUseCaseModule)

export const childContainer = container.container.createChild()
childContainer.load(containerRequest)
