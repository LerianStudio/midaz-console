import { LedgerEntity } from '../../entities/ledger-entity'

export interface CreateLedgerRepository {
  create: (
    organizationId: string,
    ledger: LedgerEntity
  ) => Promise<LedgerEntity>
}
