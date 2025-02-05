import { getIntl } from '@/lib/intl'
import { MidazError } from '../errors/midaz-error'
import { UnauthorizedException } from '../errors/http-exceptions'

export interface MidazErrorData {
  code: string
  message: string
}

export async function handleMidazError(
  midazError: MidazErrorData
): Promise<void> {
  const intl = await getIntl()

  switch (midazError.code) {
    case '0002':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.ledgerNameConflict',
          defaultMessage: 'Error Midaz name conflict'
        })
      )

    case '0003':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.assetNameOrCodeDuplicate',
          defaultMessage: 'Error Midaz asset name or code duplicate'
        })
      )

    case '0004':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.codeUpperCaseRequirement',
          defaultMessage: 'Error Midaz code upper case requirement'
        })
      )

    case '0005':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.currencyCodeStandardCompliance',
          defaultMessage: 'Error Midaz currency code standard compliance'
        })
      )

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

    case '0015':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.duplicateSegmentNameError',
          defaultMessage: 'Error Midaz duplicate segment name error'
        })
      )

    case '0017':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.invalidScriptError',
          defaultMessage: 'Error Midaz invalid script error'
        })
      )

    case '0032':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.invalidCountryCode',
          defaultMessage: 'Error Midaz invalid country code'
        })
      )

    case '0033':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.invalidCodeFormat',
          defaultMessage: 'Error Midaz invalid code format'
        })
      )

    case '0040':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.invalidType',
          defaultMessage: 'Error Midaz invalid type'
        })
      )
    case '0042':
      throw new MidazError(
        intl.formatMessage({
          id: 'error.midaz.unauthorized',
          defaultMessage: 'Error Midaz unauthorized'
        }),
        midazError.code
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
