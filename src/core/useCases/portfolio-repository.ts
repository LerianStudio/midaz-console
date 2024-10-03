import { LedgerPortfoliosEntity } from '../domain/entities/portfolios-entity'
import { BaseRepository } from '../repositories/base-repository'

export interface PortfolioRepository
  extends BaseRepository<LedgerPortfoliosEntity> {}
