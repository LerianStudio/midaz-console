import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { DeleteAccount } from '@/core/application/use-cases/accounts/delete-account-use-case'
import { FetchAccountById } from '@/core/application/use-cases/accounts/fetch-account-by-id-use-case'
import { UpdateAccount } from '@/core/application/use-cases/accounts/update-account-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const updateAccountUseCase: UpdateAccount = container.get<UpdateAccount>(
  Registry.UpdateAccountUseCase
)

const deleteAccountUseCase: DeleteAccount = container.get<DeleteAccount>(
  Registry.DeleteAccountUseCase
)

const getAccountByIdUseCase: FetchAccountById = container.get<FetchAccountById>(
  Registry.FetchAccountByIdUseCase
)

export async function GET(
  request: Request,
  {
    params
  }: {
    params: {
      id: string
      ledgerId: string
      portfolioId: string
      accountId: string
    }
  }
) {
  try {
    const { id: organizationId, ledgerId, portfolioId, accountId } = params

    console.log('GET route organizationId', organizationId)
    console.log('GET route ledgerId', ledgerId)
    console.log('GET route portfolioId', portfolioId)
    console.log('GET route accountId', accountId)

    const account = await getAccountByIdUseCase.execute(
      organizationId,
      ledgerId,
      portfolioId,
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
      portfolioId: string
      accountId: string
    }
  }
) {
  try {
    const body = await request.json()
    const { id: organizationId, ledgerId, portfolioId, accountId } = params

    const accountUpdated = await updateAccountUseCase.execute(
      organizationId,
      ledgerId,
      portfolioId,
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
      portfolioId: string
      accountId: string
    }
  }
) {
  try {
    const { id: organizationId, ledgerId, portfolioId, accountId } = params

    console.log('DELETE route organizationId', organizationId)
    console.log('DELETE route ledgerId', ledgerId)
    console.log('DELETE route portfolioId', portfolioId)
    console.log('DELETE route accountId', accountId)

    await deleteAccountUseCase.execute(
      organizationId,
      ledgerId,
      portfolioId,
      accountId
    )

    return NextResponse.json({}, { status: 204 })
  } catch (error: any) {
    console.error('Error deleting account', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
