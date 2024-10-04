import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { LedgerResponseDto } from '../../dto/ledger-response-dto'
import { FetchAllLedgersRepository } from '@/core/domain/repositories/legders/fetch-all-ledgers-repository'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { ledgerEntityToDto } from '../../mappers/ledger-mapper'
import { PaginationDto } from '../../dto/pagination-dto'

export interface FetchAllLedgers {
  execute: (
    organizationId: string,
    limit: number,
    page: number
  ) => Promise<PaginationEntity<LedgerResponseDto>>
}

export class FetchAllLedgersUseCase implements FetchAllLedgers {
  constructor(
    private readonly fetchAllLedgersRepository: FetchAllLedgersRepository
  ) {}

  async execute(
    organizationId: string,
    limit: number,
    page: number
  ): Promise<PaginationDto<LedgerResponseDto>> {
    const ledgersResult: PaginationEntity<LedgerEntity> =
      await this.fetchAllLedgersRepository.fetchAll(organizationId, limit, page)

    const { items } = ledgersResult

    const ledgerDto =
      items && items !== null ? items.map(ledgerEntityToDto) : []

    const ledgersResponse: PaginationDto<LedgerResponseDto> = {
      items: ledgerDto,
      limit: ledgersResult.limit,
      page: ledgersResult.page
    }

    return ledgersResponse
  }
}
