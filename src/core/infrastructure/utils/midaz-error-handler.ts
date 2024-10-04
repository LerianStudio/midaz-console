import { FailureMidazError, MidazError } from '../errors/midaz-error'
import { getIntl } from '@/lib/intl'

export interface MidazErrorData {
  code: string
  message: string
}

export async function handleMidazError(
  midazError: MidazErrorData
): Promise<void> {
  const intl = await getIntl()

  console.error('MidazError', midazError.code)

  switch (midazError.code) {
    case '0007':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.entityNotFound',
          defaultMessage: 'Error Midaz entity not found'
        })
      )

    case '0008':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.actionNotPermitted',
          defaultMessage: 'Error Midaz action not permitted'
        })
      )

    case '0009':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.missingFields',
          defaultMessage: 'Error Midaz missing fields'
        })
      )
    case '0032':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.invalidCountryCode',
          defaultMessage: 'Error Midaz invalid country code'
        })
      )

    default:
      console.warn('Error code not found')
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.unknowError',
          defaultMessage: 'Error on Midaz.'
        })
      )
  }
}
