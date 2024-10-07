import { LedgerEntity } from '../../entities/ledger-entity'

export interface UpdateLedgerRepository {
  update: (
    organizationId: string,
    ledgerId: string,
    ledger: Partial<LedgerEntity>
  ) => Promise<LedgerEntity>
}
