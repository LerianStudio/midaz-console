'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const instrumentsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  }
]
