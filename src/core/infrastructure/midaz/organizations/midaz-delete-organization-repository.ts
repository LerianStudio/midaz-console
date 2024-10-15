import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazDeleteOrganizationRepository
  implements DeleteOrganizationRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async deleteOrganization(id: string): Promise<void> {
    const url = `${this.baseUrl}/${id}`

    const response = await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
