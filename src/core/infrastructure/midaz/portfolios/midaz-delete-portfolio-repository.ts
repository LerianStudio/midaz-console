import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'
import { DeletePortfolioRepository } from '@/core/domain/repositories/portfolios/delete-portfolio-repository'

@injectable()
export class MidazDeletePortfolioRepository
  implements DeletePortfolioRepository
{
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`

    await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE,
    })

    return
  }
}
