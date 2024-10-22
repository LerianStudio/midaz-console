import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { AccountEntity } from '../../entities/account-entity'

export interface CreateAccountsRepository {
  create: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    account: AccountEntity
  ) => Promise<AccountEntity>
}
