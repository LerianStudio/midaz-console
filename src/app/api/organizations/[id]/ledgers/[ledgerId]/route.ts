import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  DeleteLedger,
  DeleteLedgerUseCase
} from '@/core/application/use-cases/ledgers/delete-ledger-use-case'
import {
  FetchLedgerById,
  FetchLedgerByIdUseCase
} from '@/core/application/use-cases/ledgers/fetch-ledger-by-id-use-case'
import {
  UpdateLedger,
  UpdateLedgerUseCase
} from '@/core/application/use-cases/ledgers/update-ledger-use-case'
import { NextResponse } from 'next/server'

const fetchLedgerByIdUseCase = container.get<FetchLedgerById>(
  FetchLedgerByIdUseCase
)

const updateLedgerUseCase = container.get<UpdateLedger>(UpdateLedgerUseCase)

const deleteLedgerUseCase = container.get<DeleteLedger>(DeleteLedgerUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const ledgers = await fetchLedgerByIdUseCase.execute(
      organizationId,
      ledgerId
    )

    return NextResponse.json(ledgers)
  } catch (error: any) {
    console.error('Error fetching ledger by id', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const ledgerUpdated = await updateLedgerUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    return NextResponse.json({ ledgerUpdated })
  } catch (error: any) {
    console.error('Error updating ledger', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const organizationId = params.id
    const ledgerId = params.ledgerId

    await deleteLedgerUseCase.execute(organizationId, ledgerId)

    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting ledger', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
