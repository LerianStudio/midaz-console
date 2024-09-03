import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { BaseRepository } from '@/core/repositories/base-repository'

export interface LedgerRepository extends BaseRepository<LedgerEntity> {}
