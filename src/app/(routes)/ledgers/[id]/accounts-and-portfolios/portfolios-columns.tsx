'use client'

import { ColumnDef } from '@tanstack/react-table'

export type TPortfolio = {
  id: string
  portfolio_name: string
  accounts: string
  metadata: string
  status: string
  actions: string
}

export const portfoliosColumns: ColumnDef<TPortfolio>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'portfolio_name',
    header: 'Nome do Portfolio'
  },
  {
    accessorKey: 'accounts',
    header: 'Contas'
  },
  {
    accessorKey: 'metadata',
    header: 'Metadata'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'actions',
    header: 'Ações'
  }
]
