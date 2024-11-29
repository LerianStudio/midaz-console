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
import { PinoLogger } from '@/lib/logger/pino-logger'
import { RequestContextManager } from '@/lib/logger/request-context'

const createPortfolioUseCase: CreatePortfolio = container.get<CreatePortfolio>(
  CreatePortfolioUseCase
)

const fetchAllPortfoliosUseCase: FetchAllPortfolios =
  container.get<FetchAllPortfolios>(FetchAllPortfoliosUseCase)

const logger = PinoLogger.getInstance()

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit')) || 100
  const page = Number(searchParams.get('page')) || 1
  const organizationId = params.id
  const ledgerId = params.ledgerId

  const context = {
    component: 'PortfoliosAPI',
    action: 'fetchPortfolios',
    layer: 'api' as const,
    operation: 'GET'
  }

  logger.info(
    'Fetching portfolios',
    {
      organizationId,
      ledgerId,
      page,
      limit,
      method: 'GET'
    },
    {
      ...context
    }
  )

  try {
    const portfolios = await fetchAllPortfoliosUseCase.execute(
      organizationId,
      ledgerId,
      page,
      limit
    )

    logger.info(
      'Successfully fetched portfolios',
      {
        organizationId,
        ledgerId,
        count: portfolios.items.length,
        method: 'GET'
      },
      context
    )

    return NextResponse.json(portfolios)
  } catch (error: any) {
    logger.error(
      'Failed to fetch portfolios',
      {
        organizationId,
        ledgerId,
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack
        }
      },
      {
        ...context
      }
    )
    const { message, status } = await apiErrorHandler(error)
    return NextResponse.json({ message }, { status })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const { id: organizationId, ledgerId } = params

  return RequestContextManager.runWithContext(
    request.url,
    request.method,
    { organizationId, ledgerId },
    async () => {
      try {
        const body = await request.json()
        const portfolio = await createPortfolioUseCase.execute(
          organizationId,
          ledgerId,
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
