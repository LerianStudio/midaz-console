import { z } from 'zod'
import { metadata } from './metadata'
import { assets } from './assets'

const description = z.string().max(1024)

const chartOfAccounts = z.string().max(255)

const value = z.coerce
  .number()
  .positive()
  .max(1000 * 1000 * 1000 * 1000)

const scale = z.number().positive().max(1000)

const account = z.string().min(1).max(255)

const remaining = z.string().min(1).max(255)

const asset = assets.code

const source = {
  account,
  remaining
}

export const transaction = {
  value,
  asset,
  scale,
  description,
  chartOfAccounts,
  source,
  metadata
}
