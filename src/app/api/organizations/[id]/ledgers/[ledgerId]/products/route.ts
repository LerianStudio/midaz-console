import { container } from '@/core/infrastructure/container-registry/container-registry'
import { apiErrorHandler } from '@/app/api/utils/api-error-handler'
import {
  CreateProduct,
  CreateProductUseCase
} from '@/core/application/use-cases/product/create-product-use-case'
import {
  FetchAllProducts,
  FetchAllProductsUseCase
} from '@/core/application/use-cases/product/fetch-all-products-use-case'
import { NextRequest, NextResponse } from 'next/server'
import { applyMiddleware } from '@/lib/applymiddleware/apply-middleware'
import { loggerMiddleware } from '@/utils/logger-middleware-config'

interface ProductParams {
  id: string
  ledgerId: string
}

export const POST = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'createProduct',
      method: 'POST'
    })
  ],
  async (request: NextRequest, { params }: { params: ProductParams }) => {
    try {
      const createProductUseCase: CreateProduct =
        container.get<CreateProduct>(CreateProductUseCase)

      const body = await request.json()
      const organizationId = params.id
      const ledgerId = params.ledgerId

      const productCreated = await createProductUseCase.execute(
        organizationId,
        ledgerId,
        body
      )

      return NextResponse.json(productCreated)
    } catch (error: any) {
      const { message, status } = await apiErrorHandler(error)

      return NextResponse.json({ message }, { status })
    }
  }
)

export const GET = applyMiddleware(
  [
    loggerMiddleware({
      operationName: 'fetchAllProducts',
      method: 'GET'
    })
  ],
  async (request: NextRequest, { params }: { params: ProductParams }) => {
    try {
      const fetchAllProductsUseCase: FetchAllProducts =
        container.get<FetchAllProducts>(FetchAllProductsUseCase)
      const { searchParams } = new URL(request.url)
      const limit = Number(searchParams.get('limit')) || 10
      const page = Number(searchParams.get('page')) || 1
      const organizationId = params.id
      const ledgerId = params.ledgerId

      const products = await fetchAllProductsUseCase.execute(
        organizationId,
        ledgerId,
        limit,
        page
      )

      return NextResponse.json(products)
    } catch (error: any) {
      const { message, status } = await apiErrorHandler(error)

      return NextResponse.json({ message }, { status })
    }
  }
)
