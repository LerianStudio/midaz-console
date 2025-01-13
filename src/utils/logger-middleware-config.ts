import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { container } from '@/core/infrastructure/container-registry/container-registry'
import { MidazRequestContext } from '@/core/infrastructure/logger/decorators/midaz-id'
import { NextHandler } from '@/lib/applymiddleware/types'
import { NextRequest } from 'next/server'

interface LoggerMiddlewareConfig {
  operationName: string
  method: string
  useCase: string
  action?: string
  logLevel?: 'info' | 'error' | 'warn' | 'debug' | 'audit'
}

const loggerAggregator = container.get(LoggerAggregator)
const midazRequestContext: MidazRequestContext =
  container.get<MidazRequestContext>(MidazRequestContext)

export function loggerMiddleware(config: LoggerMiddlewareConfig) {
  return async (req: NextRequest, next: NextHandler) => {
    let body = undefined
    if (config.method !== 'GET' && config.method !== 'DELETE') {
      body = await req.json()
    }

    const shouldIncludePayload =
      (config.logLevel === 'debug' && process.env.ENABLE_DEBUG === 'true') ||
      (config.logLevel !== 'debug' && process.env.ENABLE_DEBUG === 'false')

    return loggerAggregator.runWithContext(
      config.operationName,
      config.method,
      {
        useCase: config.useCase,
        action: config.action || 'execute',
        midazId: midazRequestContext.getMidazId()
      },
      async () => {
        loggerAggregator.addEvent({
          message: `${config.operationName} operation`,
          ...(shouldIncludePayload && {
            metadata: { body }
          }),
          layer: 'application',
          operation: config.operationName,
          level: config.logLevel || 'info'
        })
        const response = await next()
        return response
      }
    )
  }
}
