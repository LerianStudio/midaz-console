import { z } from 'zod'

const firstName = z.string().nullable().optional()

const lastName = z.string().nullable().optional()

const username = z.string().nullable().optional()

const email = z.string().email()

const password = z.string().min(8)

const oldPassword = z.string().min(8)

const newPassword = z.string().min(8)

const confirmPassword = z.string().min(8)

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
  oldPassword,
  newPassword,
  confirmPassword
}
