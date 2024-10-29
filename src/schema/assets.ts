import { z } from 'zod'
import { metadata } from './metadata'

const type = z.string().min(1).max(255)
const name = z.string().min(1).max(255)
const code = z.string().min(1).max(255)

export const assets = { type, name, code, metadata }
