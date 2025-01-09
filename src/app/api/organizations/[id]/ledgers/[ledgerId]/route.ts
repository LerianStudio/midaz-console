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
import { applyMiddleware } from '@/lib/applymiddleware/apply-middleware'
import { loggerMiddleware } from '@/utils/logger-middleware-config'

export const GET = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'fetchLedgerById',
      method: 'GET',
      useCase: 'FetchLedgerByIdUseCase',
      logLevel: 'info'
    })
  ],
  async (_, { params }: { params: { id: string; ledgerId: string } }) => {
    try {
      const fetchLedgerByIdUseCase: FetchLedgerById =
        container.get<FetchLedgerById>(FetchLedgerByIdUseCase)
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
)

export const PATCH = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'updateLedger',
      method: 'PATCH',
      useCase: 'UpdateLedgerUseCase',
      logLevel: 'info'
    })
  ],
  async (
    request: Request,
    { params }: { params: { id: string; ledgerId: string } }
  ) => {
    try {
      const updateLedgerUseCase =
        container.get<UpdateLedger>(UpdateLedgerUseCase)

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
)

export const DELETE = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'deleteLedger',
      method: 'DELETE',
      useCase: 'DeleteLedgerUseCase',
      logLevel: 'info'
    })
  ],
  async (_, { params }: { params: { id: string; ledgerId: string } }) => {
    try {
      const deleteLedgerUseCase =
        container.get<DeleteLedger>(DeleteLedgerUseCase)

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
)
