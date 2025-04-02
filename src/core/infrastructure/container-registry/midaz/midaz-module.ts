import { AccountRepository } from '@/core/domain/repositories/account-repository'
import { Container, ContainerModule } from '../../utils/di/container'
import { MidazAssetModule } from './asset-module'
import { MidazPortfolioModule } from './portfolio-module'
import { MidazTransactionModule } from './transaction-module'
import { BalanceRepository } from '@/core/domain/repositories/balance-repository'
import { MidazBalanceRepository } from '@/core/infrastructure/midaz/repositories/midaz-balance-repository'
import { MidazAccountRepository } from '@/core/infrastructure/midaz/repositories/midaz-account-repository'
import { OrganizationRepository } from '@/core/domain/repositories/organization-repository'
import { MidazOrganizationRepository } from '@/core/infrastructure/midaz/repositories/midaz-organization-repository'
import { LedgerRepository } from '@/core/domain/repositories/ledger-repository'
import { MidazLedgerRepository } from '@/core/infrastructure/midaz/repositories/midaz-ledger-repository'
import { SegmentRepository } from '@/core/domain/repositories/segment-repository'
import { MidazSegmentRepository } from '@/core/infrastructure/midaz/repositories/midaz-segment-repository'

export const MidazModule = new ContainerModule((container: Container) => {
  container
    .bind<OrganizationRepository>(OrganizationRepository)
    .to(MidazOrganizationRepository)
  container.bind<LedgerRepository>(LedgerRepository).to(MidazLedgerRepository)
  container.load(MidazPortfolioModule)
  container
    .bind<AccountRepository>(AccountRepository)
    .to(MidazAccountRepository)
  container.load(MidazAssetModule)
  container
    .bind<SegmentRepository>(SegmentRepository)
    .to(MidazSegmentRepository)
  container.load(MidazTransactionModule)

  container
    .bind<BalanceRepository>(BalanceRepository)
    .to(MidazBalanceRepository)
})
