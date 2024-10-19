import { PortfolioEntity } from '@/core/domain/entities/portfolios-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { CreatePortfolioRepository } from '@/core/domain/repositories/portfolios/create-portfolio-repository'
import { PortfolioResponseDto } from '@/core/application/dto/portfolios-dto'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'

export class MidazCreatePortfolioRepository
  implements CreatePortfolioRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async create(
    organizationId: string,
    ledgerId: string,
    portfolio: PortfolioEntity
  ): Promise<PortfolioEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios`

    const response = await httpMidazAuthFetch<PortfolioEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(portfolio)
    })

    return response
  }
}
