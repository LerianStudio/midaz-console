import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { getIntl } from '@/lib/intl'

export interface ErrorResponse {
  message: string
  status: number
}
export async function apiErrorHandler(error: any): Promise<ErrorResponse> {
  const intl = await getIntl()
  let errorResponse: ErrorResponse

  switch (error.constructor) {
    case MidazError:
      console.log('apiErrorHandler - MidazError', error.message)
      errorResponse = { message: error.message, status: 400 }
      break
    default:
      console.log('apiErrorHandler - Default')
      errorResponse = {
        message: intl.formatMessage({
          id: 'error.midaz.unknowError',
          defaultMessage: 'Error on Midaz.'
        }),
        status: 400
      }
  }

  return errorResponse
}
