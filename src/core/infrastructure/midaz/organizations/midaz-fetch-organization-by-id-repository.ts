import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazFetchOrganizationByIdRepository
  implements FetchOrganizationByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async fetchById(id: string): Promise<OrganizationEntity> {
    const url = `${this.baseUrl}/${id}`

    const response = await httpMidazAuthFetch<OrganizationEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
