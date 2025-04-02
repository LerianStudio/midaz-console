import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import type { CreateLedgerDto } from '../../dto/create-ledger-dto'
import { CreateLedgerRepository } from '@/core/domain/repositories/ledgers/create-ledger-repository'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'
import { inject, injectable } from 'inversify'
import { LedgerMapper } from '../../mappers/ledger-mapper'
import { OrganizationRepository } from '@/core/domain/repositories/organization-repository'
import { LogOperation } from '../../decorators/log-operation'

export interface CompleteOnboarding {
  execute: (
    organizationId: string,
    ledger: CreateLedgerDto
  ) => Promise<LedgerResponseDto>
}

@injectable()
export class CompleteOnboardingUseCase implements CompleteOnboarding {
  constructor(
    @inject(OrganizationRepository)
    private readonly organizationRepository: OrganizationRepository,
    @inject(CreateLedgerRepository)
    private readonly createLedgerRepository: CreateLedgerRepository
  ) {}

  @LogOperation({ layer: 'application' })
  async execute(
    organizationId: string,
    ledger: CreateLedgerDto
  ): Promise<LedgerResponseDto> {
    const organization =
      await this.organizationRepository.fetchById(organizationId)

    await this.organizationRepository.update(organizationId, {
      metadata: {
        ...organization.metadata,
        onboarding: null
      }
    })

    const ledgerEntity: LedgerEntity = LedgerMapper.toDomain(ledger)
    const ledgerCreated = await this.createLedgerRepository.create(
      organizationId,
      ledgerEntity
    )

    return LedgerMapper.toResponseDto(ledgerCreated)
  }
}
