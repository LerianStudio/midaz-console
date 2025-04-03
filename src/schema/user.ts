import { z } from 'zod'

const name = z.string().nullable().optional()

const lastName = z.string().nullable().optional()

const username = z.string().nullable().optional()

const email = z.string().email()

const password = z.string().min(8)

const role = z.string().min(1).max(255)

export const user = {
  name,
  lastName,
  username,
  email,
  password,
  role
}
