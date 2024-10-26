import { metadata } from '@/schema/metadata'
import { z } from 'zod'

// const ProductId = z.string().uuid()
// const ProductName = z.string().min(1, { message: 'O nome do produto é obrigatório' })

// export const productSchema = z.object({
//   id: ProductId,
//   name: ProductName,
//   // Adicione outros campos conforme necessário
// })

// export const productListSchema = z.object({
//   items: z.array(productSchema)
// })

// export type Product = z.infer<typeof productSchema>
// export type ProductList = z.infer<typeof productListSchema>

export const formSchemaPortfolio = z.object({
  name: z.string().min(3),
  entityId: z.string().min(1).max(255).optional(),
  metadata: metadata
})

export const formSchemaAccount = z.object({
  name: z
    .string()
    .min(3, { message: 'Account name must be at least 3 characters long' }),
  alias: z.string().min(1).max(255).optional(),
  entityId: z.string().min(1).max(255).optional(),
  assetCode: z.string(),
  portfolioId: z.string(),
  productId: z.string(),
  metadata: metadata
})
