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
import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { NextHandler } from '@/lib/applymiddleware/types'
import { applyMiddleware } from '@/lib/applymiddleware/apply-middleware'

const createProductUseCase: CreateProduct =
  container.get<CreateProduct>(CreateProductUseCase)

const fetchAllProductsUseCase: FetchAllProducts =
  container.get<FetchAllProducts>(FetchAllProductsUseCase)

const loggerAggregator = container.get(LoggerAggregator)

export function testeMiddleware() {
  return async (req: NextRequest, next: NextHandler) => {
    const organizationId = '12312312312'
    const ledgerId = '12312312312'
    const body = await req.json()

    return loggerAggregator.runWithContext(
      'createProduct',
      'POST',
      {
        useCase: 'CreateProductUseCase',
        action: 'execute'
      },
      async () => {
        loggerAggregator.addEvent({
          message: 'Creating product',
          metadata: { organizationId, ledgerId, product: body },
          layer: 'application',
          operation: 'createProduct',
          level: 'info'
        })
        const response = await next()
        return response
      }
    )
  }
}

interface ProductParams {
  id: string
  ledgerId: string
}

export const POST = applyMiddleware(
  [testeMiddleware()],
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

    return loggerAggregator.runWithContext(
      'fetchAllProducts',
      'GET',
      {
        useCase: 'FetchAllProductsUseCase',
        action: 'execute'
      },
      async () => {
        loggerAggregator.addEvent({
          message: 'Fetching all products',
          metadata: { organizationId, ledgerId, limit, page },
          layer: 'application',
          operation: 'fetchAllProducts',
          level: 'info'
        })

        const products = await fetchAllProductsUseCase.execute(
          organizationId,
          ledgerId,
          limit,
          page
        )

        return NextResponse.json(products)
      }
    )
  } catch (error: any) {
    console.error('Error fetching all products', error)
    const { message, status } = await apiErrorHandler(error)

    return NextResponse.json({ message }, { status })
  }
}
