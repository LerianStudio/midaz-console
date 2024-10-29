import { LedgerEntity } from '../../entities/ledger-entity'

export interface FetchLedgerByIdRepository {
  fetchById: (organizationId: string, ledgerId: string) => Promise<LedgerEntity>
}
