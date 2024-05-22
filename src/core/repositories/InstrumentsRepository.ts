import { InstrumentsEntity } from '@/domain/entities/InstrumentsEntity'
import { BaseRepository } from '@/repositories/BaseRepository'

export interface InstrumentsRepository
  extends BaseRepository<InstrumentsEntity> {}
