import { z } from 'zod'
import { metadata } from './metadata'

const name = z.string().min(3).max(255)

const alias = z.string().min(1).max(255).optional()

const entityId = z.string().min(1).max(255).optional()

const assetCode = z.string()

const portfolioId = z.string()

const productId = z.string()

export const accountSchema = z.object({
  name,
  alias,
  entityId,
  assetCode,
  portfolioId,
  productId,
  metadata
})
