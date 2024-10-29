import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import { CreateAsset } from '@/core/application/use-cases/assets/create-asset-use-case'
import { FetchAllAssets } from '@/core/application/use-cases/assets/fetch-all-assets-use-case'
import {
  container,
  Registry
} from '@/core/infrastructure/container-registry/container-registry'
import { NextResponse } from 'next/server'

const createAssetUseCase: CreateAsset = container.get<CreateAsset>(
  Registry.CreateAssetUseCase
)

const fetchAllAssetsUseCase: FetchAllAssets = container.get<FetchAllAssets>(
  Registry.FetchAllAssetsUseCase
)

export async function POST(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const assetCreated = await createAssetUseCase.execute(
      organizationId,
      ledgerId,
      body
    )

    return NextResponse.json(assetCreated)
  } catch (error: any) {
    console.error('Error creating asset', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id
    const ledgerId = params.ledgerId

    const assets = await fetchAllAssetsUseCase.execute(
      organizationId,
      ledgerId,
      limit,
      page
    )

    return NextResponse.json(assets)
  } catch (error: any) {
    console.error('Error fetching all assets', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
