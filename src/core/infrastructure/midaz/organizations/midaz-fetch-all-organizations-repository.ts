import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
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

    const response = await httpMidazAuthFetch<
      PaginationEntity<OrganizationEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
