import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable, inject } from 'inversify'
import { MidazHttpFetchUtils } from '../../utils/http-fetch-utils'

@injectable()
export class MidazDeleteOrganizationRepository
  implements DeleteOrganizationRepository
{
  constructor(
     @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async deleteOrganization(id: string): Promise<void> {
    const url = `${this.baseUrl}/${id}`

    await this.midazHttpFetchUtils.httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })
  }
}
