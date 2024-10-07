import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { UpdateOrganizationRepository } from '@/core/domain/repositories/organizations/update-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazUpdateOrganizationRepository
  implements UpdateOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'
  async updateOrganization(
    organizationId: string,
    organization: Partial<OrganizationEntity>
  ): Promise<OrganizationEntity> {
    const response = await fetch(`${this.baseUrl}/${organizationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organization)
    })

    const midazResponse = await response.json()

    console.log('midazResponse', midazResponse)

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
