import { CreateAccountsRepository } from '@/core/domain/repositories/accounts/create-accounts-repository'
import { CreateAccountDto, AccountResponseDto } from '../../dto/account-dto'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { AccountMapper } from '../../mappers/account-mapper'

export interface CreateAccount {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    account: CreateAccountDto
  ) => Promise<AccountResponseDto>
}

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly createAccountRepository: CreateAccountsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    account: CreateAccountDto
  ): Promise<AccountResponseDto> {
    account.status = {
      code: 'ACTIVE',
      description: 'Active Account'
    }
    const accountEntity: AccountEntity = AccountMapper.toDomain(account)
    const accountCreated = await this.createAccountRepository.create(
      organizationId,
      ledgerId,
      portfolioId,
      accountEntity
    )

    return AccountMapper.toDto(accountCreated)
  }
}
