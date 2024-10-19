import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { FetchPortfolioByIdRepository } from '@/core/domain/repositories/portfolios/fetch-portfolio-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazFetchPortfolioByIdRepository
  implements FetchPortfolioByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<PortfolioEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`

    const response = await httpMidazAuthFetch<PortfolioEntity>({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }
}
