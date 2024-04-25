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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import useCustomToast from '@/hooks/useCustomToast'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'

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
      header: 'ID',
      cell: ({ row }: ColumnRow) => {
        const id = row.original.id
        const displayId = id && id.length > 6 ? `${truncateString(id, 6)}` : id
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p onClick={() => handleCopyToClipboard(id, 'copyId')}>
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
      header: translateHeader('divisionName'),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.divisionName || 'No Division'
        return <p>{legalDocument}</p>
      }
    },

    {
      accessorKey: 'status',
      header: translateHeader('status')
    },

    {
      accessorKey: 'edit',
      header: () => translateHeader('edit'),
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-3">
          <Pencil
            className="h-4 w-4 cursor-pointer"
            onClick={() => ledgersEvents.handleOpenEditSheet(row.original)}
          />
        </div>
      )
    },

    {
      accessorKey: 'delete',
      header: () => translateHeader('delete'),
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-4">
          <Trash2
            className="h-4 w-4 cursor-pointer"
            onClick={() => ledgersEvents.handleOpenDeleteSheet(row.original)}
          />
        </div>
      )
    },

    {
      id: 'actions',
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-4">
          <MoreHorizontal
            className="h-4 w-4 cursor-pointer"
            onClick={() => ledgersEvents.handleOpenViewSheet(row.original)}
          />
        </div>
      )
    }
  ]
}
