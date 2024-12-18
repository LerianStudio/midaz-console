import { CreateAccountsRepository } from '@/core/domain/repositories/accounts/create-accounts-repository'
import { CreateAccountDto, AccountResponseDto } from '../../dto/account-dto'
import { AccountEntity } from '@/core/domain/entities/account-entity'
import { AccountMapper } from '../../mappers/account-mapper'
import { inject, injectable } from 'inversify'
import { LoggerAggregator } from '../../logger/logger-aggregator'

export interface CreateAccount {
  execute: (
    organizationId: string,
    ledgerId: string,
    account: CreateAccountDto
  ) => Promise<AccountResponseDto>
}

@injectable()
export class CreateAccountUseCase implements CreateAccount {
  constructor(
    @inject(CreateAccountsRepository)
    private readonly createAccountRepository: CreateAccountsRepository,
    @inject(LoggerAggregator)
    private readonly loggerAggregator: LoggerAggregator
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    account: CreateAccountDto
  ): Promise<AccountResponseDto> {
    this.loggerAggregator.addEvent({
      layer: 'application',
      operation: 'createAccount',
      level: 'info',
      message: 'Creating account',
      metadata: {
        organizationId,
        ledgerId,
        account
      }
    })

    account.status = {
      code: 'ACTIVE',
      description: 'Active Account'
    }
    const accountEntity: AccountEntity = AccountMapper.toDomain(account)
    const accountCreated = await this.createAccountRepository.create(
      organizationId,
      ledgerId,
      accountEntity
    )

    return AccountMapper.toDto(accountCreated)
  }
}
