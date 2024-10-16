import { UpdatePortfolioRepository } from '@/core/domain/repositories/portfolios/update-portfolio-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'

export class MidazUpdatePortfolioRepository
  implements UpdatePortfolioRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async update(
    organizationId: string,
    ledgerId: string,
    portfolioId: string,
    portfolio: Partial<PortfolioEntity>
  ): Promise<PortfolioEntity> {
    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(portfolio)
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazUpdatePortfolioRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
