import {
  FetchTransactionById,
  FetchTransactionByIdUseCase
} from '@/core/application/use-cases/transactions/fetch-transaction-by-id-use-case'
import { UpdateTransactionUseCase } from '@/core/application/use-cases/transactions/update-transaction-use-case'
import { UpdateTransaction } from '@/core/application/use-cases/transactions/update-transaction-use-case'
import { container } from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const getTransactionByIdUseCase: FetchTransactionById =
  container.get<FetchTransactionById>(FetchTransactionByIdUseCase)

const updateTransactionUseCase: UpdateTransaction =
  container.get<UpdateTransaction>(UpdateTransactionUseCase)

export async function GET(
  request: Request,
  {
    params
  }: { params: { id: string; ledgerId: string; transactionId: string } }
) {
  try {
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const transactionId = params.transactionId

    const transaction = await getTransactionByIdUseCase.execute(
      organizationId,
      ledgerId,
      transactionId
    )

    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  {
    params
  }: { params: { id: string; ledgerId: string; transactionId: string } }
) {
  try {
    const transaction = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const transactionId = params.transactionId
    console.log('transaction', transaction)
    const updatedTransaction = await updateTransactionUseCase.execute(
      organizationId,
      ledgerId,
      transactionId,
      transaction
    )

    console.log('updatedTransaction', updatedTransaction)

    return NextResponse.json(updatedTransaction)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    )
  }
}
