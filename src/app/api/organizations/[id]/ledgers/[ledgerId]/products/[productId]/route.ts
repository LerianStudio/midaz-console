import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  DeleteProduct,
  DeleteProductUseCase
} from '@/core/application/use-cases/product/delete-product-use-case'
import {
  FetchProductById,
  FetchProductByIdUseCase
} from '@/core/application/use-cases/product/fetch-product-by-id-use-case'
import {
  UpdateProduct,
  UpdateProductUseCase
} from '@/core/application/use-cases/product/update-product-use-case'
import { NextResponse } from 'next/server'

const fetchProductById: FetchProductById = container.get<FetchProductById>(
  FetchProductByIdUseCase
)

const deleteProductUseCase: DeleteProduct =
  container.get<DeleteProduct>(DeleteProductUseCase)

const updateProductUseCase: UpdateProduct =
  container.get<UpdateProduct>(UpdateProductUseCase)

export async function GET(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; productId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const productId = params.productId

    const products = await fetchProductById.execute(
      organizationId,
      ledgerId,
      productId
    )

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Error fetching all products', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; productId: string } }
) {
  try {
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const productId = params.productId

    await deleteProductUseCase.execute(organizationId, ledgerId, productId)

    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting product', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; ledgerId: string; productId: string } }
) {
  try {
    const body = await request.json()
    const organizationId = params.id
    const ledgerId = params.ledgerId
    const productId = params.productId

    const productUpdated = await updateProductUseCase.execute(
      organizationId,
      ledgerId,
      productId,
      body
    )

    return NextResponse.json(productUpdated)
  } catch (error: any) {
    console.error('Error updating product', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
