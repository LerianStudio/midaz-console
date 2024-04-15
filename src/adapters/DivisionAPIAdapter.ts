import { DivisionRepository } from '@/repositories/DivisionRepository'
import { DivisionEntity } from '@/entities/DivisionEntity'
import * as process from 'node:process'

export class DivisionAPIAdapter implements DivisionRepository {
  baseUrl = process.env.MIDAZ_BASE_PATH + '/divisions'

  async create(division: DivisionEntity): Promise<void> {
    const response = await fetch(this.baseUrl, {
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

  async update(id: string, division: DivisionEntity): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
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

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
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

  async getById(id: string): Promise<DivisionEntity | null> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch division by id`)
    }

    return response.json()
  }

  async list(): Promise<DivisionEntity[]> {
    const response = await fetch(this.baseUrl, {
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
}
