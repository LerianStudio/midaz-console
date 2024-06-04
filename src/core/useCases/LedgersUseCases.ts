import { LedgerEntity } from '@/core/domain/entities/LedgerEntity'
import { LedgerRepository } from '@/core/repositories/LedgerRepository'

type ILedgerssUseCases = {
  listLedgersUseCases: () => Promise<LedgerEntity[]>
  getLedgersByIdUseCases: (id: string) => Promise<LedgerEntity | null>
  deleteLedgersUseCases: (id: string) => Promise<void>
}

export class LedgersUseCases implements ILedgerssUseCases {
  constructor(private readonly ledgersAdapter: LedgerRepository) {}

  async listLedgersUseCases(): Promise<LedgerEntity[]> {
    return await this.ledgersAdapter.list()
  }

  async getLedgersByIdUseCases(id: string): Promise<LedgerEntity | null> {
    return await this.ledgersAdapter.getById(id)
  }

  async deleteLedgersUseCases(id: string) {
    return await this.ledgersAdapter.delete(id)
  }

  async createLedgersUseCases(ledger: LedgerEntity) {
    return await this.ledgersAdapter.create(ledger)
  }

  async updateLedgersUseCases(id: string, ledger: LedgerEntity) {
    return await this.ledgersAdapter.update(id, ledger)
  }
}

export default LedgersUseCases
