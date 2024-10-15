import { z } from 'zod'

const line1 = z.string().max(255)

const line2 = z.string().max(255).nullable().optional()

const zipCode = z.coerce.string()

const city = z.string().max(255)

const state = z.string().max(5)

const country = z.string().max(5)

export const address = {
  line1,
  line2,
  zipCode,
  city,
  state,
  country
}
