import { z } from 'zod'

const username = z.string().min(1).max(255)

const password = z.string().min(4, {
  message: 'O campo senha deve conter mais que 4 caracteres'
})

export const auth = { username, password }
