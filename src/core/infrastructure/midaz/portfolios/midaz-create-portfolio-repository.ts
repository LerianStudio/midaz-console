import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazCreatePortfolioRepository
  implements CreatePortfolioRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    midazId: string,
    portfolio: PortfolioEntity
  ): Promise<PortfolioEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`

    const response = await httpMidazAuthFetch<PortfolioEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(portfolio),
      headers: {
        'Midaz-Id': midazId
      }
    })

    return response
  }
}
