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

import { NextResponse } from 'next/server'
import { PinoLogger } from '@/lib/logger/pino-logger'

const createPortfolioUseCase: CreatePortfolio = container.get<CreatePortfolio>(
  CreatePortfolioUseCase
)

const fetchAllPortfoliosUseCase: FetchAllPortfolios =
  container.get<FetchAllPortfolios>(FetchAllPortfoliosUseCase)

const logger = new PinoLogger()

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit')) || 100
  const page = Number(searchParams.get('page')) || 1
  const organizationId = params.id
  const ledgerId = params.ledgerId

  logger.info('Fetching portfolios', {
    organizationId,
    ledgerId,
    page,
    limit,
    method: 'GET'
  })

  try {
    const portfolios = await fetchAllPortfoliosUseCase.execute(
      organizationId,
      ledgerId,
      page,
      limit
    )

    logger.info('Successfully fetched portfolios', {
      organizationId,
      ledgerId,
      count: portfolios.items.length,
      method: 'GET'
      // data: portfolios
    })

    return NextResponse.json(portfolios)
  } catch (error: any) {
    logger.error('Failed to fetch portfolios', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  const organizationId = params.id
  const ledgerId = params.ledgerId

  logger.info('Creating portfolio', {
    organizationId,
    ledgerId,
    method: 'POST'
  })

  try {
    const body = await request.json()
    const portfolio = await createPortfolioUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    logger.info('Successfully created portfolio', {
      organizationId,
      ledgerId,
      portfolioId: portfolio.id
    })

    return NextResponse.json(portfolio)
  } catch (error: any) {
    logger.error('Failed to create portfolio', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
