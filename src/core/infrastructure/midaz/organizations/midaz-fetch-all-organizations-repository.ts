import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../../next-auth/casdoor/next-auth-casdoor-provider'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

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
    const url = `${this.baseUrl}?${params.toString()}`

    const response = await httpMidazAuthFetch({
      url,
      method: HTTP_METHODS.GET
    })

    const midazResponse: any = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAllOrganizationsRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
