import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { CreateOrganizationRepository } from '@/core/domain/repositories/organizations/create-organization-repository'
import { injectable, inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils, HTTP_METHODS } from '../../utils/http-fetch-utils'

@injectable()
export class MidazCreateOrganizationRepository
  implements CreateOrganizationRepository
{
  constructor(
    @inject(new LazyServiceIdentifier(() => MidazHttpFetchUtils))
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_BASE_PATH + '/organizations'

  async create(
    organizationData: OrganizationEntity
  ): Promise<OrganizationEntity> {
    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<OrganizationEntity>({
        url: this.baseUrl,
        method: HTTP_METHODS.POST,
        body: JSON.stringify(organizationData)
      })

    return response
  }
}
