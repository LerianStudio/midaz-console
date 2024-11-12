import { Container, ContainerModule } from '../../utils/di/container'
import { MidazAccountModule } from './account-module'
import { MidazLedgerModule } from './ledger-module'
import { MidazOrganizationModule } from './organization-module'
import { MidazPortfolioModule } from './portfolio-module'

export const MidazModule = new ContainerModule((container: Container) => {
  container.load(MidazOrganizationModule)
  container.load(MidazLedgerModule)
  container.load(MidazPortfolioModule)
  container.load(MidazAccountModule)
})
