import { DivisionRepository } from "@/repositories/divisions/DivisionRepository";
import { DivisionEntity } from '@/entities/divisions/DivisionEntity'
import { useQuery } from '@tanstack/react-query'
import { getDivisions } from '@/client/divisionsClient'

export class DivisionAPIAdapter implements DivisionRepository {
  
    async getDivisions(): Promise<DivisionEntity[]> {
      const response = await fetch('http://localhost:3000/api/divisions')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch divisions`)
      }
      
      return response.json()
    }
    getDivisionById(id: string): Promise<DivisionEntity | null> {
        throw new Error('Method not implemented.');
    }
    createDivision(division: DivisionEntity): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updateDivision(id: string, division: DivisionEntity): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteDivision(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
  
}