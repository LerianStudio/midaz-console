import { z } from 'zod'

const firstName = z.string().nullable().optional()

const lastName = z.string().nullable().optional()

const username = z.string().nullable().optional()

const email = z.string().email()

const password = z.string().min(8)

const groups = z.array(z.string().min(1).max(255))

export const user = {
  firstName,
  lastName,
  username,
  email,
  password,
  groups
}
