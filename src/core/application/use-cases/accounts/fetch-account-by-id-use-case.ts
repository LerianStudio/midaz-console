import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { AccountResponseDto } from '../../dto/account-dto'
import { AccountMapper } from '../../mappers/account-mapper'

export interface FetchAccountById {
  execute: (
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ) => Promise<AccountResponseDto>
}

export class FetchAccountByIdUseCase implements FetchAccountById {
  constructor(
    private readonly fetchAccountByIdRepository: FetchAccountByIdRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    accountId: string
  ): Promise<AccountResponseDto> {
    const account = await this.fetchAccountByIdRepository.fetchById(
      organizationId,
      ledgerId,
      portfolioId,
      accountId
    )

    return AccountMapper.toDto(account)
  }
}
