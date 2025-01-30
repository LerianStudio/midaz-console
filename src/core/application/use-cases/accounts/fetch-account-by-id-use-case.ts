import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { AccountResponseDto } from '../../dto/account-dto'
import { AccountMapper } from '../../mappers/account-mapper'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface FetchAccountById {
  execute: (
    organizationId: string,
    ledgerId: string,
    accountId: string
  ) => Promise<AccountResponseDto>
}

@injectable()
export class FetchAccountByIdUseCase implements FetchAccountById {
  constructor(
    @inject(FetchAccountByIdRepository)
    private readonly fetchAccountByIdRepository: FetchAccountByIdRepository
  ) {}
  @LogOperation({ layer: 'application' })
  async execute(
    organizationId: string,
    ledgerId: string,
    accountId: string
  ): Promise<AccountResponseDto> {
    const account = await this.fetchAccountByIdRepository.fetchById(
      organizationId,
      ledgerId,
      accountId
    )

    return AccountMapper.toDto(account)
  }
}
