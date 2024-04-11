import { DivisionEntity } from '@/entities/DivisionEntity'
import { DivisionRepository } from '@/repositories/DivisionRepository'

type IDivisionsUseCases = {
    listDivisionsUseCases: () => Promise<DivisionEntity[]>,
    getDivisionByIdUseCases: (id: string) => Promise<DivisionEntity | null>,
    deleteDivisionUseCases: (id: string) => Promise<void>,
    createDivisionUseCases: (division: DivisionEntity) => Promise<void>,
}

export class DivisionsUseCases implements IDivisionsUseCases {
    
    constructor(private readonly divisionsAdapter: DivisionRepository) {
    }
    
    async listDivisionsUseCases(): Promise<DivisionEntity[]> {
        return await this.divisionsAdapter.list()
    }
    
    async getDivisionByIdUseCases(id: string): Promise<DivisionEntity | null> {
        return await this.divisionsAdapter.getById(id)
    }
    
    async deleteDivisionUseCases(id: string) {
        return await this.divisionsAdapter.delete(id)
    }
    
    async createDivisionUseCases(division: DivisionEntity) {
        return await this.divisionsAdapter.create(division)
    }
    
    async updateDivisionUseCases(id: string, division: DivisionEntity) {
        return await this.divisionsAdapter.update(id, division)
    }
}

export default DivisionsUseCases