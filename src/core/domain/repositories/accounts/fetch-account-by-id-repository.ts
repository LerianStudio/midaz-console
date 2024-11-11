import { AccountEntity } from '../../entities/account-entity'

export abstract class FetchAccountByIdRepository {
  abstract fetchById: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<AccountEntity>
}
