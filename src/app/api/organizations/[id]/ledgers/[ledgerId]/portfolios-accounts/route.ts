import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { NextResponse } from 'next/server'
import {
  FetchPortfoliosWithAccounts,
  FetchPortfoliosWithAccountsUseCase
} from '@/core/application/use-cases/portfolios-with-accounts/fetch-portfolios-with-account-use-case'

const fetchPortfoliosWithAccountsUseCase =
  container.get<FetchPortfoliosWithAccounts>(FetchPortfoliosWithAccountsUseCase)

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

    const portfoliosWithAccounts =
      await fetchPortfoliosWithAccountsUseCase.execute(
        organizationId,
        ledgerId,
        limit,
        page
      )

    return NextResponse.json(portfoliosWithAccounts)
  } catch (error: any) {
    console.error('Error fetching portfolios with accounts', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
