import { UpdateLedgerRepository } from '@/core/domain/repositories/ledgers/update-ledger-repository'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'
import { UpdateLedgerDto } from '../../dto/update-ledger-dto'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import {
  ledgerEntityToDto,
  ledgerUpdateDtoToEntity
} from '../../mappers/ledger-mapper'
import { inject, injectable } from 'inversify'

export interface UpdateLedger {
  execute: (
    organizationId: string,
    ledgerId: string,
    ledger: Partial<UpdateLedgerDto>
  ) => Promise<LedgerResponseDto>
}

@injectable()
export class UpdateLedgerUseCase implements UpdateLedger {
  constructor(
    @inject(UpdateLedgerRepository)
    private readonly updateLedgerRepository: UpdateLedgerRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    ledger: Partial<UpdateLedgerDto>
  ): Promise<LedgerResponseDto> {
    const ledgerEntity: Partial<LedgerEntity> = ledgerUpdateDtoToEntity(ledger)

    const updatedLedgerEntity = await this.updateLedgerRepository.update(
      organizationId,
      ledgerId,
      ledgerEntity
    )

    const ledgerResponseDto: LedgerResponseDto =
      ledgerEntityToDto(updatedLedgerEntity)

    return ledgerResponseDto
  }
}
