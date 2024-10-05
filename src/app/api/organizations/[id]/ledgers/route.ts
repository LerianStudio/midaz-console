import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { CreateLedger } from '@/core/application/use-cases/ledgers/create-ledger-use-case'
import { FetchAllLedgers } from '@/core/application/use-cases/ledgers/fetch-all-ledgers-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const fetchAllLedgersUseCases = container.get<FetchAllLedgers>(
  Registry.FetchAllLedgersUseCase
)
const createLedgerUseCases = container.get<CreateLedger>(
  Registry.CreateLedgerUseCase
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id

    const ledgers = await fetchAllLedgersUseCases.execute(
      organizationId,
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = params.id
    const body = await request.json()

    const ledger = await createLedgerUseCases.execute(organizationId, body)
    return NextResponse.json({ ledger }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating ledger', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
