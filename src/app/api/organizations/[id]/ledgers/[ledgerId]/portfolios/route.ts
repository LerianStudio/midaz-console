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

const createPortfolioUseCase: CreatePortfolio = container.get<CreatePortfolio>(
  CreatePortfolioUseCase
)

const fetchAllPortfoliosUseCase: FetchAllPortfolios =
  container.get<FetchAllPortfolios>(FetchAllPortfoliosUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 100
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const portfolios = await fetchAllPortfoliosUseCase.execute(
      organizationId,
      ledgerId,
      page,
      limit
    )

    return NextResponse.json(portfolios)
  } catch (error: any) {
    console.error('Error fetching all portfolios', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const portfolio = await createPortfolioUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    return NextResponse.json(portfolio)
  } catch (error: any) {
    console.error('Error creating portfolio', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
