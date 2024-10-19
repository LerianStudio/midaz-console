import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazCreateOrganizationRepository
  implements CreateOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async create(
    organizationData: OrganizationEntity
  ): Promise<OrganizationEntity> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organizationData)
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
