import { z } from 'zod'
import messages from '@/lib/zod/messages'
import {
  regex,
  oneUpperCaseLetter,
  oneLowerCaseLetter,
  oneNumber,
  oneSpecialCharacter
} from './regex'

const firstName = z.string().min(3).max(255)

const lastName = z.string().min(3).max(255)

const username = z.string().min(3).max(255)

const email = z.string().email().max(255)

const password = z
  .string()
  .min(8)
  .max(255)
  .refine(regex(oneUpperCaseLetter), {
    message: messages.custom_one_uppercase_letter.defaultMessage
  })
  .refine(regex(oneLowerCaseLetter), {
    message: messages.custom_one_lowercase_letter.defaultMessage
  })
  .refine(regex(oneNumber), {
    message: messages.custom_one_number.defaultMessage
  })
  .refine(regex(oneSpecialCharacter), {
    message: messages.custom_one_special_character.defaultMessage
  })

const confirmPassword = z.string().min(8).max(255)

const groups = z.string()

export const user = {
  firstName,
  lastName,
  username,
  email,
  password,
  groups
}

export const passwordChange = {
  confirmPassword
}
