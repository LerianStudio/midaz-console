import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { NextResponse } from 'next/server'
import {
  FetchAccountsWithPortfolios,
  FetchAccountsWithPortfoliosUseCase
} from '@/core/application/use-cases/accounts-with-portfolios/fetch-accounts-with-portfolios-use-case'

const fetchAccountsWithPortfoliosUseCase =
  container.get<FetchAccountsWithPortfolios>(FetchAccountsWithPortfoliosUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 100
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id

    const accountsWithPortfolios =
      await fetchAccountsWithPortfoliosUseCase.execute(
        organizationId,
        params.ledgerId,
        limit,
        page
      )

    return NextResponse.json(accountsWithPortfolios)
  } catch (error: any) {
    console.error('Error fetching accounts with portfolios', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
