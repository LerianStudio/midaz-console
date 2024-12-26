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
import { requestIdMiddleware } from '@/lib/middleware/request-id'
import { loggerMiddleware } from '@/utils/logger-middleware-config'

const createProductUseCase: CreateProduct =
  container.get<CreateProduct>(CreateProductUseCase)

const fetchAllProductsUseCase: FetchAllProducts =
  container.get<FetchAllProducts>(FetchAllProductsUseCase)

interface ProductParams {
  id: string
  ledgerId: string
}

export const POST = applyMiddleware(
  [
    requestIdMiddleware(),
    loggerMiddleware({
      operationName: 'createProduct',
      method: 'POST',
      useCase: 'CreateProductUseCase',
      logLevel: 'info'
    })
  ],
  async (request: NextRequest, { params }: { params: ProductParams }) => {
    try {
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
      console.error('Error creating product', error)
      const { message, status } = await apiErrorHandler(error)

      return NextResponse.json({ message }, { status })
    }
  }
)

export const GET = applyMiddleware(
  [
    requestIdMiddleware(),
    loggerMiddleware({
      operationName: 'fetchAllProducts',
      method: 'GET',
      useCase: 'FetchAllProductsUseCase',
      logLevel: 'debug'
    })
  ],
  async (request: NextRequest, { params }: { params: ProductParams }) => {
    try {
      const { searchParams } = new URL(request.url)
      const limit = Number(searchParams.get('limit')) || 10
      const page = Number(searchParams.get('page')) || 1
      const organizationId = params.id
      const ledgerId = params.ledgerId

      console.log('midazId', request.headers.get('X-Midaz-Id'))

      const products = await fetchAllProductsUseCase.execute(
        organizationId,
        ledgerId,
        limit,
        page
      )

      return NextResponse.json(products)
    } catch (error: any) {
      console.error('Error fetching all products', error)
      const { message, status } = await apiErrorHandler(error)

      return NextResponse.json({ message }, { status })
    }
  }
)
