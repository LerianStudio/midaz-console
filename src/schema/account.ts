import { z } from 'zod'
import { metadata } from './metadata'

const name = z.string().min(3).max(255)

const alias = z.string().min(1).max(255)

const entityId = z.string().nullable().optional()

const assetCode = z.string()

const portfolioId = z.string().nullable().optional()

const productId = z.string().nullable().optional()

const type = z.string()

const allowSending = z.boolean()

const allowReceiving = z.boolean()

export const accountSchema = z.object({
  name,
  alias,
  entityId,
  assetCode,
  portfolioId,
  productId,
  metadata,
  type,
  allowSending,
  allowReceiving
})
