'use client'

import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Ledger } from '@/types/LedgersType'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-export-i18n'
import { useMemo } from 'react'
import { LinkWithLocale } from 'next-export-i18n'

type DynamicButtonProps = {
  row: Row<Ledger>
}

const DynamicButton = ({ row }: DynamicButtonProps) => {
  const router = useRouter()

  return (
    <div className="flex justify-end">
      <LinkWithLocale href={`/ledgers/${row.original.id}`}>
        <Button size="icon" variant="secondary">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </LinkWithLocale>
    </div>
  )
}

export const useLedgerColumns = () => {
  const { t } = useTranslation()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('table.headerName')
      },
      {
        id: 'actions',
        cell: ({ row }: DynamicButtonProps) => <DynamicButton row={row} />
      }
    ],
    [t]
  )

  return columns
}
