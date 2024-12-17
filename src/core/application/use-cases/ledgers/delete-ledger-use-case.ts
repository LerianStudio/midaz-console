import { DeleteLedgerRepository } from '@/core/domain/repositories/ledgers/delete-ledger-repository'
import { inject, injectable } from 'inversify'

export interface DeleteLedger {
  execute: (organizationId: string, ledgerId: string) => Promise<void>
}

@injectable()
export class DeleteLedgerUseCase implements DeleteLedger {
  constructor(
    @inject(DeleteLedgerRepository)
    private readonly deleteLedgerRepository: DeleteLedgerRepository
  ) {}

  async execute(organizationId: string, ledgerId: string): Promise<void> {
    await this.deleteLedgerRepository.delete(organizationId, ledgerId)
  }
}
