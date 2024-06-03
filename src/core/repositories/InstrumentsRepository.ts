import { InstrumentsEntity } from '@/core/domain/entities/InstrumentsEntity'
import { BaseRepository } from '@/core/repositories/BaseRepository'

export interface InstrumentsRepository
  extends BaseRepository<InstrumentsEntity> {}
