import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  DeleteAccount,
  DeleteAccountUseCase
} from '@/core/application/use-cases/accounts/delete-account-use-case'
import {
  FetchAccountById,
  FetchAccountByIdUseCase
} from '@/core/application/use-cases/accounts/fetch-account-by-id-use-case'
import {
  UpdateAccount,
  UpdateAccountUseCase
} from '@/core/application/use-cases/accounts/update-account-use-case'
import { NextResponse } from 'next/server'

const updateAccountUseCase: UpdateAccount =
  container.get<UpdateAccount>(UpdateAccountUseCase)

const deleteAccountUseCase: DeleteAccount =
  container.get<DeleteAccount>(DeleteAccountUseCase)

const getAccountByIdUseCase: FetchAccountById = container.get<FetchAccountById>(
  FetchAccountByIdUseCase
)

export async function GET(
  request: Request,
  {
    params
  }: {
    params: {
      id: string
      ledgerId: string
      accountId: string
    }
  }
) {
  try {
    const { id: organizationId, ledgerId, accountId } = params

    const account = await getAccountByIdUseCase.execute(
      organizationId,
      ledgerId,
      accountId
    )

    return NextResponse.json(account)
  } catch (error: any) {
    console.error('Error getting account', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: Request,
  {
    params
  }: {
    params: {
      id: string
      ledgerId: string
      accountId: string
    }
  }
) {
  try {
    const body = await request.json()
    const { id: organizationId, ledgerId, accountId } = params

    const accountUpdated = await updateAccountUseCase.execute(
      organizationId,
      ledgerId,
      accountId,
      body
    )

    return NextResponse.json(accountUpdated)
  } catch (error: any) {
    console.error('Error updating account', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(
  request: Request,
  {
    params
  }: {
    params: {
      id: string
      ledgerId: string
      accountId: string
    }
  }
) {
  try {
    const organizationId = params.id!
    const ledgerId = params.ledgerId
    const accountId = params.accountId

    await deleteAccountUseCase.execute(organizationId, ledgerId, accountId)

    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting account', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
