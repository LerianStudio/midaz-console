import { AccountRepository } from '@/core/domain/repositories/account-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazAssetModule } from './asset-module'
import { MidazLedgerModule } from './ledger-module'
import { MidazOrganizationModule } from './organization-module'
import { MidazPortfolioModule } from './portfolio-module'
import { MidazSegmentModule } from './segment-module'
import { MidazTransactionModule } from './transaction-module'
import { BalanceRepository } from '@/core/domain/repositories/balance-repository'
import { MidazBalanceRepository } from '@/core/infrastructure/midaz/repositories/midaz-balance-repository'
import { MidazAccountRepository } from '@/core/infrastructure/midaz/repositories/midaz-account-repository'

export const MidazModule = new ContainerModule((container: Container) => {
  container.load(MidazOrganizationModule)
  container.load(MidazLedgerModule)
  container.load(MidazPortfolioModule)
  container
    .bind<AccountRepository>(AccountRepository)
    .to(MidazAccountRepository)
  container.load(MidazAssetModule)
  container.load(MidazSegmentModule)
  container.load(MidazTransactionModule)

  container
    .bind<BalanceRepository>(BalanceRepository)
    .to(MidazBalanceRepository)
})
