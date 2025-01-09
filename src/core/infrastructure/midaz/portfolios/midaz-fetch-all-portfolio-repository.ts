import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { FetchAllPortfoliosRepository } from '@/core/domain/repositories/portfolios/fetch-all-portfolio-repository'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable, inject, LazyServiceIdentifier } from 'inversify'
import { MidazHttpFetchUtils } from '../../utils/http-fetch-utils'
@injectable()
export class MidazFetchAllPortfoliosRepository
  implements FetchAllPortfoliosRepository
{
  constructor(
    @inject(new LazyServiceIdentifier(() => MidazHttpFetchUtils))
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<PortfolioEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios?limit=${limit}&page=${page}`

    const response = await this.midazHttpFetchUtils.httpMidazAuthFetch<
      PaginationEntity<PortfolioEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
