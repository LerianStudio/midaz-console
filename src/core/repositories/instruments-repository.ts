import { InstrumentsEntity } from '@/core/domain/entities/instruments-entity'
import { BaseRepository } from '@/core/repositories/base-repository'

export interface InstrumentsRepository
  extends BaseRepository<InstrumentsEntity> {}
