import { DeleteAccountsRepository } from '@/core/domain/repositories/accounts/delete-accounts-repository'

export interface DeleteAccount {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<void>
}

export class DeleteAccountUseCase implements DeleteAccount {
  constructor(
    private readonly deleteAccountRepository: DeleteAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ): Promise<void> {
    await this.deleteAccountRepository.delete(
      organizationId,
      ledgerId,
      portfolioId,
      accountId
    )
  }
}
