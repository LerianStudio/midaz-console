import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { DivisionRepository } from '@/repositories/divisions/DivisionRepository'
import { DivisionAPIAdapter } from '@/adapters/divisions/DivisionAPIAdapter'

type IDivisionsUseCases = {
  listDivisionsUseCases: () => Promise<DivisionEntity[]>
}

export class DivisionsUseCases implements IDivisionsUseCases {
  
  constructor(private readonly divisionsAdapter: DivisionRepository) {
  }
  
  async listDivisionsUseCases(): Promise<DivisionEntity[]> {
    return await this.divisionsAdapter.getDivisions()
  }
  
  async getDivisionByIdUseCases(id: string): Promise<DivisionEntity | null> {
    return await this.divisionsAdapter.getDivisionById(id)
  }
  
  async deleteDivisionUseCases(id: string) {
    return await this.divisionsAdapter.deleteDivision(id)
  }
}

export default DivisionsUseCases