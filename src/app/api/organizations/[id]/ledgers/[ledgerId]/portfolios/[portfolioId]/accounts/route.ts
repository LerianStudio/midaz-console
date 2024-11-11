import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  CreateAccount,
  CreateAccountUseCase
} from '@/core/application/use-cases/accounts/create-account-use-case'
import {
  FetchAllAccounts,
  FetchAllAccountsUseCase
} from '@/core/application/use-cases/accounts/fetch-all-account-use-case'

import { NextResponse } from 'next/server'

// Update use case references
const createAccountUseCase: CreateAccount =
  container.get<CreateAccount>(CreateAccountUseCase)

const fetchAllAccountsUseCase: FetchAllAccounts =
  container.get<FetchAllAccounts>(FetchAllAccountsUseCase)

export async function GET(
  request: Request,
  {
    params
  }: {
    params: {
      id: string
      ledgerId: string
      organizationId: string
      portfolioId: string
    }
  }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const portfolioId = params.portfolioId

    const accounts = await fetchAllAccountsUseCase.execute(
      organizationId,
      ledgerId,
      portfolioId,
      page,
      limit
    )

    return NextResponse.json(accounts)
  } catch (error: any) {
    console.error('Error fetching all accounts', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; portfolioId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const portfolioId = params.portfolioId

    const account = await createAccountUseCase.execute(
      organizationId,
      ledgerId,
      portfolioId,
      body
    )

    return NextResponse.json(account)
  } catch (error: any) {
    console.error('Error creating accounts', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
