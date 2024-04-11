import { DivisionRepository } from '@/repositories/divisions/DivisionRepository'
import { DivisionEntity } from '@/entities/divisions/DivisionEntity'

export class DivisionAPIAdapter implements DivisionRepository {
  
  async getDivisions(): Promise<DivisionEntity[]> {
    const response = await fetch('http://localhost:3001/divisions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch divisions`)
    }
    
    return response.json()
  }
  
  
  async getDivisionById(id: string): Promise<DivisionEntity | null> {
    const response = await fetch(`http://localhost:3001/divisions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('response', response)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch division by id`)
    }
    
    
    
    return response.json()
  }
  
  async createDivision(division: DivisionEntity): Promise<void> {
    const response = await fetch('http://localhost:3001/divisions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(division)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create divisions`)
    }
    
    return response.json()
  }
  
  async updateDivision(id: string, division: DivisionEntity): Promise<void> {
    console.log('division', division)
    console.log('id', id)
    const response = await fetch(`http://localhost:3001/divisions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(division)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to update divisions`)
    }
    
    return response.json()
  }
  
  async deleteDivision(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3001/divisions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to delete divisions`)
    }
    
    return response.json()
  }
  
}