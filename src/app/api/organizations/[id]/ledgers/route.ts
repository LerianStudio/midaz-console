import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { CreateLedger } from '@/core/application/use-cases/ledgers/create-ledgers-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const ledgerUseCases = container.get<CreateLedger>(Registry.CreateLedgerUseCase)

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('params', params)
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
