import { z } from 'zod'

const firstName = z.string().min(3).max(255)

const lastName = z.string().min(3).max(255)

const username = z.string().min(3).max(255)

const email = z.string().email().max(255)

const password = z.string().min(8).max(255)

const oldPassword = z.string().min(8).max(255)

const newPassword = z.string().min(8).max(255)

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
  oldPassword,
  newPassword,
  confirmPassword
}
