import { AccountEntity } from '../../entities/account-entity'

export interface UpdateAccountsRepository {
  update: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string,
    account: Partial<AccountEntity>
  ) => Promise<AccountEntity>
}
