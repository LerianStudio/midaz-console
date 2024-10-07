import { CreateLedger } from '@/core/application/use-cases/ledgers/create-ledger-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'
import { apiErrorHandler } from '../utils/api-error-handler'

const ledgerUseCases = container.get<CreateLedger>(Registry.CreateLedgerUseCase)

// export async function GET() {
//   const ledgers = await ledgersUseCases.listLedgersUseCases()
//   return NextResponse.json(ledgers)
// }

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = params.id
    const body = await request.json()

    const ledger = await ledgerUseCases.execute(organizationId, body)
    return NextResponse.json({ ledger }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating ledger', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
