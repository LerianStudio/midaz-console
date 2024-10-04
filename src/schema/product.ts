import { z } from 'zod'

const name = z.string().min(1)

export const product = { name }
