import { PortfolioRepository } from '@/core/repositories/portfolio-repository'
import * as process from 'node:process'
import { LedgerPortfoliosEntity } from '../domain/entities/portfolios-entity'

export class PortfoliosAPIAdapter implements PortfolioRepository {
  readonly baseUrl: string = process.env.MIDAZ_BASE_PATH + '/portfolios'

  async create(portfolio: LedgerPortfoliosEntity): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portfolio)
    })

    if (!response.ok) {
      throw new Error(`Failed to create portfolio`)
    }

    return response.json()
  }

  async update(id: string, portfolio: LedgerPortfoliosEntity): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portfolio)
    })

    if (!response.ok) {
      throw new Error(`Failed to update portfolio`)
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
      throw new Error(`Failed to delete portfolio`)
    }

    return response.json()
  }

  async list(): Promise<LedgerPortfoliosEntity[]> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolios`)
    }

    return response.json()
  }

  async getById(id: string): Promise<LedgerPortfoliosEntity | null> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio by id`)
    }

    return response.json()
  }
}
