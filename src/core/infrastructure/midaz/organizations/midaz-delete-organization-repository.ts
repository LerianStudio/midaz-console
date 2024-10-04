import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazDeleteOrganizationRepository
  implements DeleteOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async deleteOrganization(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      throw await handleMidazError(midazResponse)
    }
  }
}
