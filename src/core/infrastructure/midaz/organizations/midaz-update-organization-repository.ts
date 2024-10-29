import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazUpdateOrganizationRepository
  implements UpdateOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'
  async updateOrganization(
    organizationId: string,
    organization: Partial<OrganizationEntity>
  ): Promise<OrganizationEntity> {
    const url = `${this.baseUrl}/${organizationId}`

    const response = await httpMidazAuthFetch<OrganizationEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(organization)
    })

    return response
  }
}
