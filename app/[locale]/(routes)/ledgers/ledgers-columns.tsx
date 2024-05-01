'use client'

import { Row } from '@tanstack/react-table'
import React from 'react'
import { truncateString } from '@/helpers'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { MoreVertical, Trash } from 'lucide-react'

import useCustomToast from '@/hooks/useCustomToast'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button/button'

export type LedgersColumnsEvents = {
  handleClickId?: (id: string) => void
  handleClickLegalDocument?: (document: string) => void
  handleOpenEditSheet: (ledgersData: LedgerEntity) => void
  handleOpenViewSheet: (ledgersData: LedgerEntity) => void
  handleOpenDeleteSheet: (ledgersData: LedgerEntity) => void
}

type ColumnRow = {
  row: Row<LedgerEntity>
}

export const getLedgersColumns = (
  ledgersEvents: LedgersColumnsEvents,
  t: any
) => {
  const { showInfo } = useCustomToast()

  const translateHeader = (itemNamespace: string) => {
    return t(`columnsTable.${itemNamespace}`)
  }

  const translateToast = (itemNamespace: string) => {
    return t(`toast.${itemNamespace}`)
  }

  const handleCopyToClipboard = (value: string, itemNamespace: string) => {
    navigator.clipboard.writeText(value)
    showInfo(translateToast(itemNamespace))
  }

  return [
    {
      accessorKey: 'id',
      header: 'Ledger ID',
      cell: ({ row }: ColumnRow) => {
        const id = row.original.id
        const displayId = id && id.length > 8 ? `${truncateString(id, 8)}` : id
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  onClick={() => handleCopyToClipboard(id, 'copyId')}
                  className="text-shadcn-600 underline"
                >
                  {displayId}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    {
      accessorKey: 'name',
      header: translateHeader('name'),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay = row.original.name || row.original.name
        return <p>{nameToDisplay}</p>
      }
    },
    {
      accessorKey: 'divisionName',
      header: translateHeader('instruments'),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.divisionName || 'No Division'
        return <p>{legalDocument}</p>
      }
    },
    {
      accessorKey: 'divisionName',
      header: translateHeader('metadata'),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.divisionName || 'No Division'
        return <p>{legalDocument}</p>
      }
    },
    {
      accessorKey: 'status',
      header: translateHeader('status'),
      cell: ({ row }: ColumnRow) => {
        const status = row.original.status
        return <p className="capitalize">{status}</p>
      }
    },
    {
      id: 'actions',
      header: translateHeader('actions'),
      cell: ({ row }: ColumnRow) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-auto w-max rounded-md border border-shadcn-300 bg-white p-2 text-black shadow-sm outline-none hover:bg-white">
              <MoreVertical
                size={16}
                onClick={() => ledgersEvents.handleOpenViewSheet(row.original)}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => ledgersEvents.handleOpenEditSheet(row.original)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Inativar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-3"
              onClick={() => ledgersEvents.handleOpenDeleteSheet(row.original)}
            >
              <span>Apagar</span>
              <Trash size={16} className="text-shadcn-400" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]
}
