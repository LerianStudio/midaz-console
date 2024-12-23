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
import { requestIdMiddleware } from '@/lib/middleware/request-id'

const createProductUseCase: CreateProduct =
  container.get<CreateProduct>(CreateProductUseCase)

const fetchAllProductsUseCase: FetchAllProducts =
  container.get<FetchAllProducts>(FetchAllProductsUseCase)

const loggerAggregator = container.get(LoggerAggregator)

interface LoggerMiddlewareConfig {
  operationName: string
  method: string
  useCase: string
  action?: string
}

export function loggerMiddleware(config: LoggerMiddlewareConfig) {
  return async (req: NextRequest, next: NextHandler) => {
    const existingMidazId = req.headers.get('X-Midaz-Id')

    if (!existingMidazId) {
      req.headers.set('X-Midaz-Id', crypto.randomUUID())
    }

    let body = undefined
    if (config.method !== 'GET') {
      body = await req.json()
    }

    return loggerAggregator.runWithContext(
      config.operationName,
      config.method,
      {
        useCase: config.useCase,
        action: config.action || 'execute'
      },
      async () => {
        loggerAggregator.addEvent({
          message: `${config.operationName} operation`,
          metadata: { body, midazId: req.headers.get('X-Midaz-Id') },
          layer: 'application',
          operation: config.operationName,
          level: 'info'
        })
        const response = await next()
        return response
      }
    )
  }
}

// Add interface for params
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
      useCase: 'CreateProductUseCase'
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
      useCase: 'FetchAllProductsUseCase'
    })
  ],
  async (request: NextRequest, { params }: { params: ProductParams }) => {
    try {
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

      console.log('products', products)

      return NextResponse.json(products)
    } catch (error: any) {
      console.error('Error fetching all products', error)
      const { message, status } = await apiErrorHandler(error)

      return NextResponse.json({ message }, { status })
    }
  }
)

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string; ledgerId: string } }
// ) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const limit = Number(searchParams.get('limit')) || 10
//     const page = Number(searchParams.get('page')) || 1
//     const organizationId = params.id
//     const ledgerId = params.ledgerId
//     const midazId = request.headers.get('X-Midaz-Id')
//     return loggerAggregator.runWithContext(
//       'fetchAllProducts',
//       'GET',
//       {
//         useCase: 'FetchAllProductsUseCase',
//         action: 'execute'
//       },
//       async () => {
//         console.log('midazId', midazId)
//         loggerAggregator.addEvent({
//           message: 'Fetching all products',
//           metadata: { organizationId, ledgerId, limit, page },
//           layer: 'application',
//           operation: 'fetchAllProducts',
//           level: 'debug'
//         })

//         const products = await fetchAllProductsUseCase.execute(
//           organizationId,
//           ledgerId,
//           limit,
//           page
//         )

//         return NextResponse.json(products)
//       }
//     )
//   } catch (error: any) {
//     console.error('Error fetching all products', error)
//     const { message, status } = await apiErrorHandler(error)

//     return NextResponse.json({ message }, { status })
//   }
// }
