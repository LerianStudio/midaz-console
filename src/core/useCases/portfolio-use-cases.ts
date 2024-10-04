import { LedgerPortfoliosEntity } from '../domain/entities/portfolios-entity'
import { PortfolioRepository } from '../repositories/portfolio-repository'

type IPortfoliossUseCases = {
  listPortfoliosUseCases: () => Promise<LedgerPortfoliosEntity[]>
  getPortfoliosByIdUseCases: (
    id: string
  ) => Promise<LedgerPortfoliosEntity | null>
  deletePortfoliosUseCases: (id: string) => Promise<void>
}

export class PortfoliosUseCases implements IPortfoliossUseCases {
  constructor(private readonly portfoliosAdapter: PortfolioRepository) {}

  async listPortfoliosUseCases(): Promise<LedgerPortfoliosEntity[]> {
    return await this.portfoliosAdapter.list()
  }

  async getPortfoliosByIdUseCases(
    id: string
  ): Promise<LedgerPortfoliosEntity | null> {
    return await this.portfoliosAdapter.getById(id)
  }

  async deletePortfoliosUseCases(id: string) {
    return await this.portfoliosAdapter.delete(id)
  }

  async createPortfoliosUseCases(ledger: LedgerPortfoliosEntity) {
    return await this.portfoliosAdapter.create(ledger)
  }

  async updatePortfoliosUseCases(id: string, ledger: LedgerPortfoliosEntity) {
    return await this.portfoliosAdapter.update(id, ledger)
  }
}

export default PortfoliosUseCases
