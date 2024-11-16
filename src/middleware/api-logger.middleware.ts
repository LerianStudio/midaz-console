import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PinoLogger } from '@/lib/logger/pino-logger'

const logger = new PinoLogger()

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

  // logger.info('Incoming API request', requestMetadata)

  try {
    const response = await next()
    const duration = Date.now() - startTime

    // logger.info('API request completed', {
    //   ...requestMetadata,
    //   status: response.status,
    //   duration
    // })

    response.headers.set('X-Request-Id', requestId)
    return response
  } catch (error) {
    const duration = Date.now() - startTime

    logger.error(
      'API request failed',
      error instanceof Error ? error : new Error('Unknown error'),
      {
        ...requestMetadata,
        duration
      }
    )

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
