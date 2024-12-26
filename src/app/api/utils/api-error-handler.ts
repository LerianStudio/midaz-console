import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { container } from '@/core/infrastructure/container-registry/container-registry'
import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { getIntl } from '@/lib/intl'
import { PinoLogger } from '@/lib/logger/pino-logger'

export interface ErrorResponse {
  message: string
  status: number
}

export async function apiErrorHandler(error: any): Promise<ErrorResponse> {
  const intl = await getIntl()
  const loggerAggregator = container.get(LoggerAggregator)
  let errorResponse: ErrorResponse

  const errorMetadata = {
    errorType: error.constructor.name,
    originalMessage: error.message
  }

  switch (error.constructor) {
    case MidazError:
      loggerAggregator.addEvent({
        layer: 'api',
        operation: 'api_error_handler',
        level: 'error',
        message: error.message,
        metadata: errorMetadata
      })
      errorResponse = { message: error.message, status: 400 }
      break
    case UnauthorizedException:
      loggerAggregator.addEvent({
        layer: 'api',
        operation: 'api_error_handler',
        level: 'error',
        message: error.message,
        metadata: errorMetadata
      })
      errorResponse = { message: error.message, status: 401 }
      break
    default:
      loggerAggregator.addEvent({
        layer: 'api',
        operation: 'api_error_handler',
        level: 'error',
        message: error.message,
        metadata: errorMetadata
      })
      errorResponse = {
        message: intl.formatMessage({
          id: 'error.midaz.unknowError',
          defaultMessage: 'Error on Midaz.'
        }),
        status: 500
      }
  }

  return errorResponse
}
