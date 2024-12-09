import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  CreatePortfolio,
  CreatePortfolioUseCase
} from '@/core/application/use-cases/portfolios/create-portfolio-use-case'
import {
  FetchAllPortfolios,
  FetchAllPortfoliosUseCase
} from '@/core/application/use-cases/portfolios/fetch-all-portfolio-use-case'
import { NextRequest, NextResponse } from 'next/server'
import { RequestContextManager } from '@/lib/logger/request-context'

const createPortfolioUseCase: CreatePortfolio = container.get<CreatePortfolio>(
  CreatePortfolioUseCase
)

const fetchAllPortfoliosUseCase: FetchAllPortfolios =
  container.get<FetchAllPortfolios>(FetchAllPortfoliosUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit')) || 100
  const page = Number(searchParams.get('page')) || 1
  const organizationId = params.id
  const ledgerId = params.ledgerId
  return RequestContextManager.runWithContext(
    request.url,
    request.method,
    { organizationId, ledgerId },
    async () => {
      try {
        const portfolios = await fetchAllPortfoliosUseCase.execute(
          organizationId,
          ledgerId,
          page,
          limit
        )

        return NextResponse.json(portfolios)
      } catch (error: any) {
        const { message, status } = await apiErrorHandler(error)
        return NextResponse.json({ message }, { status })
      }
    }
  )
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const { id: organizationId, ledgerId } = params
  const midazId = request.headers.get('X-Midaz-Id')
  return RequestContextManager.runWithContext(
    request.url,
    request.method,
    { organizationId, ledgerId, midazId },
    async () => {
      try {
        if (!midazId) {
          return NextResponse.json(
            { message: 'X-Midaz-Id header is required' },
            { status: 400 }
          )
        }
        const body = await request.json()
        const portfolio = await createPortfolioUseCase.execute(
          organizationId,
          ledgerId,
          midazId,
          body
        )
        return NextResponse.json(portfolio)
      } catch (error) {
        const { message, status } = await apiErrorHandler(error)
        return NextResponse.json({ message }, { status })
      }
    }
  )
}
