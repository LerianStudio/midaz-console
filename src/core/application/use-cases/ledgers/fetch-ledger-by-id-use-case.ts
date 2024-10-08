import { FetchLedgerByIdRepository } from '@/core/domain/repositories/ledgers/fetch-ledger-by-id-repository'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'
import { ledgerEntityToDto } from '../../mappers/ledger-mapper'

export interface FetchLedgerById {
  execute: (
    organizationId: string,
    ledgerId: string
  ) => Promise<LedgerResponseDto>
}

export class FetchLedgerByIdUseCase implements FetchLedgerById {
  constructor(
    private readonly fetchLedgerByIdRepository: FetchLedgerByIdRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string
  ): Promise<LedgerResponseDto> {
    const ledgerEntity = await this.fetchLedgerByIdRepository.fetchById(
      organizationId,
      ledgerId
    )

    const ledgerResponseDto: LedgerResponseDto = ledgerEntityToDto(ledgerEntity)

    return ledgerResponseDto
  }
}
