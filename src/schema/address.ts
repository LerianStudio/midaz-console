import { z } from 'zod'

const line1 = z.string()

const line2 = z.string().nullable().optional()

const zipCode = z.coerce.string()

const city = z.string()

const state = z.string()

const country = z.string()

export const address = {
  line1,
  line2,
  zipCode,
  city,
  state,
  country
}
