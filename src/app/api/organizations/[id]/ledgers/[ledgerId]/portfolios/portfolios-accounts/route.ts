import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { FetchAllLedgersAssets } from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'
import { FetchAllPortfoliosAccounts } from '@/core/application/use-cases/portfolios-accounts/fetch-portfolios-accounts-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const fetchAllPortfoliosAccountsUseCases =
  container.get<FetchAllPortfoliosAccounts>(
    Registry.FetchAllPortfoliosAccountsUseCase
  )

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id

    const ledgers = await fetchAllPortfoliosAccountsUseCases.execute(
      organizationId,
      params.ledgerId,
      limit,
      page
    )

    return NextResponse.json(ledgers)
  } catch (error: any) {
    console.error('Error fetching all ledgers', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
