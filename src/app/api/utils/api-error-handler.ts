import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import { MidazError } from '@/core/infrastructure/errors/midaz-error'
import { getIntl } from '@/lib/intl'
import { signOut } from 'next-auth/react'

export interface ErrorResponse {
  message: string
  status: number
}
export async function apiErrorHandler(error: any): Promise<ErrorResponse> {
  const intl = await getIntl()
  let errorResponse: ErrorResponse

  console.log('apiErrorHandler - error.constructor', error.constructor)

  switch (error.constructor) {
    case MidazError:
      console.log('apiErrorHandler - MidazError', error.message)
      errorResponse = { message: error.message, status: 400 }
      break
    case UnauthorizedException:
      console.log(
        '[ERROR] - apiErrorHandler - UnauthorizedException',
        error.message
      )
      errorResponse = { message: error.message, status: 401 }
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
