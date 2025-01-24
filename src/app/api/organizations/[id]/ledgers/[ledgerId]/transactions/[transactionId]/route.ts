import {
  FetchTransactionById,
  FetchTransactionByIdUseCase
} from '@/core/application/use-cases/transactions/fetch-transaction-by-id-use-case'
import { container } from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const getTransactionByIdUseCase: FetchTransactionById =
  container.get<FetchTransactionById>(FetchTransactionByIdUseCase)

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
