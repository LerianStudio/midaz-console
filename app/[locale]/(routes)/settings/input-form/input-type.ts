type InputType = {
  id?: string
  name: string
  document: string
  metadata?: Record<string, any>
  status: {
    code: string
    description: string
  }
}

export type { InputType }
