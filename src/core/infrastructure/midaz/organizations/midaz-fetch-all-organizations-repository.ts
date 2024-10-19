import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'

export class MidazFetchAllOrganizationsRepository
  implements FetchAllOrganizationsRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async fetchAll(
    limit: number,
    page: number
  ): Promise<PaginationEntity<OrganizationEntity>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString()
    })
    const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAllOrganizationsRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
