import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { FetchOrganizationByIdRepository } from '@/core/domain/repositories/organizations/fetch-organization-by-id-repository'
import { injectable, inject } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazFetchOrganizationByIdRepository
  implements FetchOrganizationByIdRepository
{
  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async fetchById(id: string): Promise<OrganizationEntity> {
    const url = `${this.baseUrl}/${id}`

    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<OrganizationEntity>({
        url,
        method: HTTP_METHODS.GET
      })

    return response
  }
}
