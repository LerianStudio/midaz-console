import { FetchAccountByIdRepository } from '@/core/domain/repositories/accounts/fetch-account-by-id-repository'
import { AccountResponseDto } from '../../dto/account-dto'
import { accountEntityToDto } from '../../mappers/account-mapper'

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
    console.log('FetchAccountByIdUseCase', organizationId)
    console.log('FetchAccountByIdUseCase', ledgerId)
    console.log('FetchAccountByIdUseCase', portfolioId)
    console.log('FetchAccountByIdUseCase', accountId)

    const account = await this.fetchAccountByIdRepository.fetchById(
      organizationId,
      ledgerId,
      portfolioId,
      accountId
    )

    console.log('FetchAccountByIdUseCase account', account)

    const accountResponseDto: AccountResponseDto = accountEntityToDto(account)

    return accountResponseDto
  }
}
