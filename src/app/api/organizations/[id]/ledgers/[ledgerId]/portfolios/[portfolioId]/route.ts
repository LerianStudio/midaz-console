import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  DeletePortfolio,
  DeletePortfolioUseCase
} from '@/core/application/use-cases/portfolios/delete-portfolio-use-case'
import {
  FetchPortfolioById,
  FetchPortfolioByIdUseCase
} from '@/core/application/use-cases/portfolios/fetch-portfolio-by-id-use-case'
import {
  UpdatePortfolio,
  UpdatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/update-portfolio-use-case'
import { NextRequest, NextResponse } from 'next/server'
import { RequestContextManager } from '@/lib/logger/request-context'
import { applyMiddleware } from '@/lib/applymiddleware/apply-middleware'
import { loggerMiddleware } from '@/utils/logger-middleware-config'

const updatePortfolioUseCase: UpdatePortfolio = container.get<UpdatePortfolio>(
  UpdatePortfolioUseCase
)

const deletePortfolioUseCase: DeletePortfolio = container.get<DeletePortfolio>(
  DeletePortfolioUseCase
)
const getPortfolioByIdUseCase: FetchPortfolioById =
  container.get<FetchPortfolioById>(FetchPortfolioByIdUseCase)

export const DELETE = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'deletePortfolio',
      method: 'DELETE',
      useCase: 'DeletePortfolioUseCase',
      logLevel: 'audit'
    })
  ],
  async (
    request: NextRequest,
    {
      params
    }: { params: { id: string; ledgerId: string; portfolioId: string } }
  ) => {
    const { id: organizationId, ledgerId, portfolioId } = params

    try {
      await deletePortfolioUseCase.execute(
        organizationId,
        ledgerId,
        portfolioId
      )
      return NextResponse.json({}, { status: 200 })
    } catch (error: any) {
      const { message, status } = await apiErrorHandler(error)
      return NextResponse.json({ message }, { status })
    }
  }
)

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
) {
  const { id: organizationId, ledgerId, portfolioId } = params
  return RequestContextManager.runWithContext(
    request.url,
    request.method,
    { organizationId, ledgerId, portfolioId },
    async () => {
      try {
        const body = await request.json()

        const portfolioUpdated = await updatePortfolioUseCase.execute(
          organizationId,
          ledgerId,
          portfolioId,
          body
        )

        return NextResponse.json(portfolioUpdated)
      } catch (error: any) {
        const { message, status } = await apiErrorHandler(error)
        return NextResponse.json({ message }, { status })
      }
    }
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
) {
  const { id: organizationId, ledgerId, portfolioId } = params
  return RequestContextManager.runWithContext(
    request.url,
    request.method,
    { organizationId, ledgerId, portfolioId },
    async () => {
      try {
        const organizationId = params.id
        const ledgerId = params.ledgerId
        const portfolioId = params.portfolioId

        const portfolio = await getPortfolioByIdUseCase.execute(
          organizationId,
          ledgerId,
          portfolioId
        )

        return NextResponse.json(portfolio)
      } catch (error: any) {
        const { message, status } = await apiErrorHandler(error)

        return NextResponse.json({ message }, { status })
      }
    }
  )
}
