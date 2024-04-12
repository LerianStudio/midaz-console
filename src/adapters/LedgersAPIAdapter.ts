import { LedgerEntity } from '@/entities/LedgerEntity'
import { LedgerRepository } from '@/repositories/LedgerRepository'

export class LedgersAPIAdapter implements LedgerRepository {
    readonly baseUrl = 'http://localhost:3001/ledgers'
    
    
    async create(ledger: LedgerEntity): Promise<void> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ledger)
        })
        
        if (!response.ok) {
            throw new Error(`Failed to create ledger`)
        }
        
        return response.json()
    }
    
    
    async update(id: string, ledger: LedgerEntity): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ledger)
        })
        
        if (!response.ok) {
            throw new Error(`Failed to update ledger`)
        }
        
        return response.json()
    }
    
    async delete(id: string): Promise<void> {
        console.log('id', id)
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`Failed to delete ledger`)
        }
        
        return response.json()
    }
    
    async list(): Promise<LedgerEntity[]> {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`Failed to fetch ledgers`)
        }
        
        return response.json()
    }
    
    async getById(id: string): Promise<LedgerEntity | null> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`Failed to fetch ledger by id`)
        }
        
        return response.json()
    }
    
}