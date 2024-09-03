import { InstrumentsEntity } from '@/core/domain/entities/instruments-entity'
import { InstrumentsRepository } from '@/core/repositories/instruments-repository'
import * as process from 'node:process'

export class InstrumentsAPIAdapter implements InstrumentsRepository {
  readonly baseUrl: string = process.env.MIDAZ_BASE_PATH + '/instruments'

  async create(instrument: InstrumentsEntity): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instrument)
    })

    if (!response.ok) {
      throw new Error(`Failed to create ledger`)
    }

    return response.json()
  }

  async update(id: string, instrument: InstrumentsEntity): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instrument)
    })

    if (!response.ok) {
      throw new Error(`Failed to update ledger`)
    }

    return response.json()
  }

  async delete(id: string): Promise<void> {
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

  async list(): Promise<InstrumentsEntity[]> {
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

  async getById(id: string): Promise<InstrumentsEntity | null> {
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
