import { AccountEntity } from '../../entities/account-entity'

export interface FetchAccountByIdRepository {
  fetchById: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<AccountEntity>
}
