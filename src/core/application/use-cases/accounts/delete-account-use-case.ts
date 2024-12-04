import { DeleteAccountsRepository } from '@/core/domain/repositories/accounts/delete-accounts-repository'
import { inject, injectable } from 'inversify'

export interface DeleteAccount {
  execute: (
    organizationId: string,
    ledgerId: string,
    accountId: string
  ) => Promise<void>
}

@injectable()
export class DeleteAccountUseCase implements DeleteAccount {
  constructor(
    @inject(DeleteAccountsRepository)
    private readonly deleteAccountRepository: DeleteAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    accountId: string
  ): Promise<void> {
    await this.deleteAccountRepository.delete(
      organizationId,
      ledgerId,
      accountId
    )
  }
}
