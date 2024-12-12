import { UpdatePortfolioRepository } from '@/core/domain/repositories/portfolios/update-portfolio-repository'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazUpdatePortfolioRepository
  implements UpdatePortfolioRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async update(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    midazId: string,
    portfolio: Partial<PortfolioEntity>
  ): Promise<PortfolioEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`

    const response = await httpMidazAuthFetch<PortfolioEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(portfolio),
      headers: {
        'Midaz-Id': midazId
      }
    })

    return response
  }
}
