import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { BaseRepository } from '@/repositories/BaseRepository'
import process from 'node:process'

interface IOrganizationRepository extends BaseRepository<OrganizationEntity> {}

class OrganizationRepository implements IOrganizationRepository {
  baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async create(data: OrganizationEntity): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to create organizations`)
    }

    return response.json()
  }
  async list(): Promise<OrganizationEntity[]> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations`)
    }

    return response.json()
  }

  async getById(id: string): Promise<OrganizationEntity | null> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch organization by id`)
    }

    return response.json()
  }

  async update(id: string, data: OrganizationEntity): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to update organization`)
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
      console.error(response)
      throw new Error(`Failed to delete organization`)
    }

    return response.json()
  }
}

export default OrganizationRepository
export type { IOrganizationRepository }
