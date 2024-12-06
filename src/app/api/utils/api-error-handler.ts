import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { getIntl } from '@/lib/intl'
import { PinoLogger } from '@/lib/logger/pino-logger'
import { RequestContextManager } from '@/lib/logger/request-context'

const logger = PinoLogger.getInstance()

export interface ErrorResponse {
  message: string
  status: number
}

export async function apiErrorHandler(error: any): Promise<ErrorResponse> {
  const intl = await getIntl()
  let errorResponse: ErrorResponse

  const errorMetadata = {
    errorType: error.constructor.name,
    originalMessage: error.message
  }

  switch (error.constructor) {
    case MidazError:
      RequestContextManager.addEvent({
        layer: 'api',
        operation: 'api_error_handler',
        level: 'error',
        message: error.message,
        metadata: errorMetadata
      })
      errorResponse = { message: error.message, status: 400 }
      break
    case UnauthorizedException:
      RequestContextManager.addEvent({
        layer: 'api',
        operation: 'api_error_handler',
        level: 'error',
        message: error.message,
        metadata: errorMetadata
      })
      errorResponse = { message: error.message, status: 401 }
      break
    default:
      RequestContextManager.addEvent({
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
