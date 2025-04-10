import { LedgerRepository } from '@/core/domain/repositories/ledger-repository'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'
import { UpdateLedgerDto } from '../../dto/update-ledger-dto'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { inject, injectable } from 'inversify'
import { LedgerMapper } from '../../mappers/ledger-mapper'
import { LogOperation } from '../../decorators/log-operation'

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
    @inject(LedgerRepository)
    private readonly ledgerRepository: LedgerRepository
  ) {}

  @LogOperation({ layer: 'application' })
  async execute(
    organizationId: string,
    ledgerId: string,
    ledger: Partial<UpdateLedgerDto>
  ): Promise<LedgerResponseDto> {
    const ledgerEntity: Partial<LedgerEntity> = LedgerMapper.toDomain(ledger)

    const updatedLedgerEntity = await this.ledgerRepository.update(
      organizationId,
      ledgerId,
      ledgerEntity
    )

    return LedgerMapper.toResponseDto(updatedLedgerEntity)
  }
}
