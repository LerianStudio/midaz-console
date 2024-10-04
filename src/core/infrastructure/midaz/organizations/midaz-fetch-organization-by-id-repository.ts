import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchOrganizationByIdRepository
  implements FetchOrganizationByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async fetchById(id: string): Promise<OrganizationEntity> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    console.log('midazResponse', midazResponse)

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
