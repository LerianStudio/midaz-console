import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { CreateLedgerDto } from '../../dto/create-ledger-dto'
import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import {
  ledgerDtoToEntity,
  ledgerEntityToDto
} from '../../mappers/ledger-mapper'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'

export interface CreateLedger {
  execute: (
    organizationId: string,
    ledger: CreateLedgerDto
  ) => Promise<LedgerResponseDto>
}

export class CreateLedgerUseCase implements CreateLedger {
  constructor(
    private readonly createLedgerRepository: CreateLedgerRepository
  ) {}

  async execute(
    organizationId: string,
    ledger: CreateLedgerDto
  ): Promise<LedgerResponseDto> {
    const ledgerEntity: LedgerEntity = ledgerDtoToEntity(ledger)
    const ledgerCreated = await this.createLedgerRepository.create(
      organizationId,
      ledgerEntity
    )

    const ledgerResponseDto: LedgerResponseDto =
      ledgerEntityToDto(ledgerCreated)

    return ledgerResponseDto
  }
}
