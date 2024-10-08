import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'

export interface DeleteLedger {
  execute: (organizationId: string, ledgerId: string) => Promise<void>
}

export class DeleteLedgerUseCase implements DeleteLedger {
  constructor(
    private readonly deleteLedgerRepository: DeleteLedgerRepository
  ) {}

  async execute(organizationId: string, ledgerId: string): Promise<void> {
    await this.deleteLedgerRepository.delete(organizationId, ledgerId)
  }
}
