import { defineMessages } from 'react-intl'

const messages = defineMessages({
  invalid_type: {
    id: 'errors.invalid_type',
    defaultMessage: ''
  },
  invalid_type_received_undefined: {
    id: 'errors.invalid_type_received_undefined',
    defaultMessage: 'Required field'
  },

  // too_small
  too_small_string_exact: {
    id: 'errors.too_small.string.exact',
    defaultMessage: 'Field must contain exactly {minimum} characters'
  },
  too_small_string_inclusive: {
    id: 'errors.too_small.string.inclusive',
    defaultMessage: 'Field must contain at least {minimum} characters'
  },
  too_small_string_not_inclusive: {
    id: 'errors.too_small.string.not_inclusive',
    defaultMessage: 'Field must contain over {minimum} characters'
  },
  too_small_date_exact: {
    id: 'errors.too_small.date.exact',
    defaultMessage: 'Date must be exactly {minimum}'
  },
  too_small_date_inclusive: {
    id: 'errors.too_small.date.inclusive',
    defaultMessage: 'Date must be after or equal to {minimum}'
  },
  too_small_date_not_inclusive: {
    id: 'errors.too_small.date.not_inclusive',
    defaultMessage: 'Date must be after {minimum}'
  },

  // too_big
  too_big_string_exact: {
    id: 'errors.too_big.string.exact',
    defaultMessage: 'Field must contain exactly {maximum} characters'
  },
  too_big_string_inclusive: {
    id: 'errors.too_big.string.inclusive',
    defaultMessage: 'Field must contain at most {maximum} characters'
  },
  too_big_string_not_inclusive: {
    id: 'errors.too_big.string.not_inclusive',
    defaultMessage: 'Field must contain under {maximum} characters'
  },
  too_big_date_exact: {
    id: 'errors.too_big.date.exact',
    defaultMessage: 'Date must be exactly {maximum}'
  },
  too_big_date_inclusive: {
    id: 'errors.too_big.date.inclusive',
    defaultMessage: 'Date must be before or equal to {maximum}'
  },
  too_big_date_not_inclusive: {
    id: 'errors.too_big.date.not_inclusive',
    defaultMessage: 'Date must be before {maximum}'
  },

  // custom
  custom_special_characters: {
    id: 'errors.custom.special_characters',
    defaultMessage: 'Field must not contain special characters'
  },
  custom_one_uppercase_letter: {
    id: 'errors.custom.one_uppercase_letter',
    defaultMessage: 'Field must contain at least 1 uppercase letter'
  },
  custom_one_lowercase_letter: {
    id: 'errors.custom.one_lowercase_letter',
    defaultMessage: 'Field must contain at least 1 lowercase letter'
  },
  custom_one_number: {
    id: 'errors.custom.one_number',
    defaultMessage: 'Field must contain at least 1 number'
  },
  custom_date_invalid: {
    id: 'errors.custom.date.invalid',
    defaultMessage: 'Invalid date'
  }
})

export default messages
