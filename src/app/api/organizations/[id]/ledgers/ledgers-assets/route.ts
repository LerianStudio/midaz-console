import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { FetchAllLedgersAssets } from '@/core/application/use-cases/ledgers-assets/fetch-ledger-assets-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const fetchAllLedgersUseCases = container.get<FetchAllLedgersAssets>(
  Registry.FetchAllLedgersAssetsUseCase
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
