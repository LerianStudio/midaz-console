'use client'

import { Row } from '@tanstack/react-table'
import React, { useState } from 'react'
import { capitalizeFirstLetter, truncateString } from '@/helpers'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Minus, MoreVertical, Trash } from 'lucide-react'

import useCustomToast from '@/hooks/useCustomToast'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button/button'
import { Badge } from '@/components/ui/badge'
import { Arrow } from '@radix-ui/react-tooltip'

export type LedgersColumnsEvents = {
  handleClickId?: (id: string) => void
  handleClickLegalDocument?: (document: string) => void
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
            <Tooltip delayDuration={300}>
              <TooltipTrigger
                onClick={() => handleCopyToClipboard(id, 'copyId')}
              >
                <p className="text-shadcn-600 underline">{displayId}</p>
              </TooltipTrigger>
              <TooltipContent
                className="border-none bg-shadcn-600"
                arrowPadding={0}
              >
                <p className="text-shadcn-400">{id}</p>
                <p
                  className="text-center text-white"
                  onClick={() => handleCopyToClipboard(id, 'copyId')}
                >
                  {t('columnsTable.tooltipCopyText')}
                </p>
                <Arrow height={8} width={15} />
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
      accessorKey: 'instruments',
      header: translateHeader('instruments'),
      cell: ({ row }: ColumnRow) => {
        const instruments = row.original.instruments as { code: string }[]

        if (instruments === null || instruments.length === 0) {
          return (
            <Button variant="link" className="p-0">
              {t('columnsTable.instrumentsAdd')}
            </Button>
          )
        }

        return (
          <div>
            {instruments.map((instrument) => instrument.code).join(', ')}
          </div>
        )
      }
    },
    {
      accessorKey: 'metadata',
      header: translateHeader('metadata'),
      cell: ({ row }: ColumnRow) => {
        const metadata = row.original.metadata

        if (metadata === null) {
          return <Minus size={20} />
        }

        const metadataLength = metadata ? Object.keys(metadata).length : 0

        return (
          <p>
            {metadataLength} {metadataLength === 1 ? 'registro' : 'registros'}
          </p>
        )
      }
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className="text-center">{translateHeader('status')}</div>
      ),
      cell: ({ row }: ColumnRow) => {
        const status = row.original.status
        const badgeVariant = status.code === 'ACTIVE' ? 'active' : 'inactive'

        return (
          <div className="text-center">
            <Badge variant={badgeVariant}>
              {capitalizeFirstLetter(status.code)}
            </Badge>
          </div>
        )
      }
    },
    {
      id: 'actions',
      header: translateHeader('actions'),
      size: 90,
      cell: ({ row }: ColumnRow) => (
        <React.Fragment>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-auto w-max rounded-md border border-shadcn-300 bg-white p-2 text-black shadow-sm outline-none hover:bg-white">
                <MoreVertical
                  size={16}
                  onClick={() =>
                    ledgersEvents.handleOpenViewSheet(row.original)
                  }
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}} disabled={true}>
                {t('columnsTable.actionsText.edit')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {t('columnsTable.actionsText.inactivate')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-3"
                onClick={() =>
                  ledgersEvents.handleOpenDeleteSheet(row.original)
                }
              >
                <span>{t('columnsTable.actionsText.delete')}</span>
                <Trash size={16} className="text-shadcn-400" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </React.Fragment>
      )
    }
  ]
}
