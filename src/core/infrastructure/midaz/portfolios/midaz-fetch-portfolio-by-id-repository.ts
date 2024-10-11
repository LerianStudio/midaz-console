import { PortfoliosEntity } from '@/core/domain/entities/portfolios-entity'
import { FetchPortfolioByIdRepository } from '@/core/domain/repositories/portfolios/fetch-portfolio-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchPortfolioByIdRepository
  implements FetchPortfolioByIdRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<PortfoliosEntity> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchPortfolioByIdRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse as PortfoliosEntity
  }
}
