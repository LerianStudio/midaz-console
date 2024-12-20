import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  CreateTransaction,
  CreateTransactionUseCase
} from '@/core/application/use-cases/transactions/create-transaction-use-case'
import { container } from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const createTransactionUseCase = container.get<CreateTransaction>(
  CreateTransactionUseCase
)

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const response = await createTransactionUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error creating transaction', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
