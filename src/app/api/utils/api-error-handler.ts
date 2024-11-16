import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { getIntl } from '@/lib/intl'
import { PinoLogger } from '@/lib/logger/pino-logger'

const logger = new PinoLogger()

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
      logger.error('Business logic error occurred', error, errorMetadata)
      errorResponse = { message: error.message, status: 400 }
      break
    case UnauthorizedException:
      logger.error('Authentication error occurred', error, errorMetadata)
      errorResponse = { message: error.message, status: 401 }
      break
    default:
      logger.error('Unexpected error occurred', error, errorMetadata)
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
