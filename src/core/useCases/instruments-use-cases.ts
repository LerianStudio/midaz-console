import { InstrumentsEntity } from '@/core/domain/entities/instruments-entity'
import { InstrumentsRepository } from '@/core/repositories/instruments-repository'

type IInstrumentsUseCases = {
  listInstrumentsUseCases: () => Promise<InstrumentsEntity[]>
  getInstrumentsByIdUseCases: (id: string) => Promise<InstrumentsEntity | null>
  deleteInstrumentsUseCases: (id: string) => Promise<void>
}

export class InstrumentsUseCases implements IInstrumentsUseCases {
  constructor(private readonly instrumentsAdapter: InstrumentsRepository) {}

  async listInstrumentsUseCases(): Promise<InstrumentsEntity[]> {
    return await this.instrumentsAdapter.list()
  }

  async getInstrumentsByIdUseCases(id: string): Promise<any> {
    return await this.instrumentsAdapter.getById(id)
  }

  async deleteInstrumentsUseCases(id: string) {
    return await this.instrumentsAdapter.delete(id)
  }

  async createInstrumentsUseCases(instrument: InstrumentsEntity) {
    return await this.instrumentsAdapter.create(instrument)
  }

  async updateInstrumentsUseCases(id: string, instrument: InstrumentsEntity) {
    return await this.instrumentsAdapter.update(id, instrument)
  }
}

export default InstrumentsUseCases
