'use client'

import { ColumnDef, Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Ledger } from '@/types/LedgersType'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type DynamicButtonProps = {
  row: Row<Ledger>
}

const DynamicButton = ({ row }: DynamicButtonProps) => {
  const router = useRouter()

  return (
    <div className="flex justify-end">
      <Button
        size="icon"
        onClick={() => router.push(`/ledgers/${row.original.id}`)}
        variant="secondary"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const columns: ColumnDef<Ledger>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DynamicButton row={row} />
  }
]
