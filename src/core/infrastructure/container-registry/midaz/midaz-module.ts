import { AccountRepository } from '@/core/domain/repositories/account-repository'
import { Container, ContainerModule } from '../../utils/di/container'
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
import { AssetRepository } from '@/core/domain/repositories/asset-repository'
import { MidazAssetRepository } from '@/core/infrastructure/midaz/repositories/midaz-asset-repository'

export const MidazModule = new ContainerModule((container: Container) => {
  container
    .bind<OrganizationRepository>(OrganizationRepository)
    .to(MidazOrganizationRepository)
  container.bind<LedgerRepository>(LedgerRepository).to(MidazLedgerRepository)
  container.load(MidazPortfolioModule)
  container
    .bind<AccountRepository>(AccountRepository)
    .to(MidazAccountRepository)
  container.bind<AssetRepository>(AssetRepository).to(MidazAssetRepository)
  container
    .bind<SegmentRepository>(SegmentRepository)
    .to(MidazSegmentRepository)
  container.load(MidazTransactionModule)

  container
    .bind<BalanceRepository>(BalanceRepository)
    .to(MidazBalanceRepository)
})
