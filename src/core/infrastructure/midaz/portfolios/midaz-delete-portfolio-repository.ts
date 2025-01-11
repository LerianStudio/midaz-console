import { HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable, inject } from 'inversify'
import { DeletePortfolioRepository } from '@/core/domain/repositories/portfolios/delete-portfolio-repository'
import { MidazHttpFetchUtils } from '../../utils/http-fetch-utils'

@injectable()
export class MidazDeletePortfolioRepository
  implements DeletePortfolioRepository
{
  constructor(
    @inject(MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    portfolioId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/portfolios/${portfolioId}`

    await this.midazHttpFetchUtils.httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
