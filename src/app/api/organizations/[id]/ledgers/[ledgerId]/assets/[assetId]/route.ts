import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  DeleteAsset,
  DeleteAssetUseCase
} from '@/core/application/use-cases/assets/delete-asset-use-case'
import {
  FetchAssetById,
  FetchAssetByIdUseCase
} from '@/core/application/use-cases/assets/fetch-asset-by-id-use-case'
import {
  UpdateAsset,
  UpdateAssetUseCase
} from '@/core/application/use-cases/assets/update-asset-use-case'
import { NextResponse } from 'next/server'

const fetchAssetByIdUseCase: FetchAssetById = container.get<FetchAssetById>(
  FetchAssetByIdUseCase
)

const updateAssetUseCase = container.get<UpdateAsset>(UpdateAssetUseCase)

const deleteAssetUseCase = container.get<DeleteAsset>(DeleteAssetUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; assetId: string } }
) {
  try {
    const { id, ledgerId, assetId } = params

    const assets = await fetchAssetByIdUseCase.execute(id, ledgerId, assetId)

    return NextResponse.json(assets)
  } catch (error: any) {
    console.error('Error fetching asset', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; assetId: string } }
) {
  try {
    const { id, ledgerId, assetId } = params
    const body = await request.json()

    const assetUpdated = await updateAssetUseCase.execute(
      id,
      ledgerId,
      assetId,
      body
    )

    return NextResponse.json(assetUpdated)
  } catch (error: any) {
    console.error('Error updating asset', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; assetId: string } }
) {
  try {
    const { id, ledgerId, assetId } = params

    await deleteAssetUseCase.execute(id, ledgerId, assetId)

    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting asset', error)

    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
