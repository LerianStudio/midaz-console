import { RequestContextManager } from '@/lib/logger/request-context'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function apiLoggerMiddleware(
  request: NextRequest,
  next: () => Promise<NextResponse>
) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()

  const requestMetadata = {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
    referer: request.headers.get('referer')
  }

  try {
    const response = await next()
    const duration = Date.now() - startTime

    RequestContextManager.addEvent({
      level: 'info',
      message: 'API request completed',
      layer: 'api',
      operation: 'request_end',
      metadata: {
        duration,
        status: response.status,
        ...requestMetadata
      }
    })
    response.headers.set('X-Midaz-Id', requestId)
    return response
  } catch (error) {
    const duration = Date.now() - startTime

    RequestContextManager.addEvent({
      layer: 'api',
      operation: 'request_error',
      level: 'error',
      message: 'Request failed',
      error: error as Error,
      metadata: {
        duration,
        ...requestMetadata
      }
    })

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
