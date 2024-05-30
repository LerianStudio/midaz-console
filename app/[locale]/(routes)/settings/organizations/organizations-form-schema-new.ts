import { z } from 'zod'

const organizationsFormSchemaNew = z.object({
  id: z.string().optional(),
  legalName: z.string().max(100, "required").refine((value) => value.length > 0),
  // doingBusinessAs: z.string().refine((value) => value.length > 0, {
  //   message: 'Doing business as is required'
  // }),
  // address: z.object({
  //
  //   state: z.string().min(1),
  //   country: z.string().min(1)
  // }),
  // metadata: z.record(z.string(), z.any()).optional(),
})


export { organizationsFormSchemaNew }