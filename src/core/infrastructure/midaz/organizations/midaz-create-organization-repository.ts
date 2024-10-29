import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazCreateOrganizationRepository
  implements CreateOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async create(
    organizationData: OrganizationEntity
  ): Promise<OrganizationEntity> {
    const response = await httpMidazAuthFetch<OrganizationEntity>({
      url: this.baseUrl,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(organizationData)
    })

    return response
  }
}
