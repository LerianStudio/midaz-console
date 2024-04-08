import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { DivisionRepository } from '@/repositories/divisions/DivisionRepository'

interface IListDivisionsUseCases {
  execute: () => Promise<DivisionEntity[]>
}

export class ListDivisionsUseCases implements IListDivisionsUseCases {
  
  constructor(private readonly divisionRepository: DivisionRepository) {
  }
  
  async execute(): Promise<DivisionEntity[]> {
    return await this.divisionRepository.getDivisions()
  }
  
}

export default ListDivisionsUseCases