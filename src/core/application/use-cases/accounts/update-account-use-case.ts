import { UpdateAccountsRepository } from '@/core/domain/repositories/accounts/update-accounts-repository'
import { AccountResponseDto, UpdateAccountDto } from '../../dto/account-dto'
import { AccountMapper } from '../../mappers/account-mapper'
import { AccountEntity } from '@/core/domain/entities/account-entity'

export interface UpdateAccount {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string,
    account: Partial<UpdateAccountDto>
  ) => Promise<AccountResponseDto>
}

export class UpdateAccountUseCase implements UpdateAccount {
  constructor(
    private readonly updateAccountRepository: UpdateAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string,
    account: Partial<UpdateAccountDto>
  ): Promise<AccountResponseDto> {
    // Remove this if you don't want to force the status
    account.status = {
      code: 'ACTIVE',
      description: 'Active Account'
    }
    const accountEntity: Partial<AccountEntity> =
      AccountMapper.toDomain(account)

    const updatedAccount: AccountEntity =
      await this.updateAccountRepository.update(
        organizationId,
        ledgerId,
        portfolioId,
        accountId,
        accountEntity
      )

    return AccountMapper.toDto(updatedAccount)
  }
}
