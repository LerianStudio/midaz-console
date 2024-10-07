'use client'

import { Row } from '@tanstack/react-table'
import React from 'react'
import { capitalizeFirstLetter, truncateString } from '@/helpers'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Minus, MoreVertical, Trash } from 'lucide-react'

import useCustomToast from '@/hooks/use-custom-toast'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Arrow } from '@radix-ui/react-tooltip'
import { useIntl } from 'react-intl'
import Link from 'next/link'

export type LedgersColumnsEvents = {
  handleClickId?: (id: string) => void
  handleClickLegalDocument?: (document: string) => void
  handleOpenViewSheet: (ledgersData: LedgerEntity) => void
  handleOpenDeleteSheet: (ledgersData: LedgerEntity) => void
}

type ColumnRow = {
  row: Row<any>
}

export const getLedgersColumns = (ledgersEvents: LedgersColumnsEvents) => {
  const intl = useIntl()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
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
                onClick={() =>
                  handleCopyToClipboard(
                    id,
                    intl.formatMessage({
                      id: 'ledgers.toast.copyId',
                      defaultMessage:
                        'The id has been copied to your clipboard.'
                    })
                  )
                }
              >
                <p className="text-shadcn-600 underline">{displayId}</p>
              </TooltipTrigger>
              <TooltipContent
                className="border-none bg-shadcn-600"
                arrowPadding={0}
              >
                <p className="text-shadcn-400">{id}</p>
                <p className="text-center text-white">
                  {intl.formatMessage({
                    id: 'ledgers.columnsTable.tooltipCopyText',
                    defaultMessage: 'Click to copy'
                  })}
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
      header: intl.formatMessage({
        id: 'entity.ledger.name',
        defaultMessage: 'Ledger Name'
      }),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay = row.original.name || row.original.name
        return <p>{nameToDisplay}</p>
      }
    },
    {
      accessorKey: 'instruments',
      header: intl.formatMessage({
        id: 'entity.ledger.asset',
        defaultMessage: 'Asset'
      }),
      cell: ({ row }: ColumnRow) => {
        const instruments = row.original.instruments as
          | { code: string }[]
          | undefined

        if (!instruments || instruments.length === 0) {
          return (
            <Button variant="link" className="p-0">
              {intl.formatMessage({ id: 'common.add', defaultMessage: 'Add' })}
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
      header: intl.formatMessage({
        id: 'entity.ledger.metadata',
        defaultMessage: 'Metadata'
      }),
      cell: ({ row }: ColumnRow) => {
        const metadata = row.original.metadata

        if (metadata === null || metadata.length === 0) {
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
        <div className="text-center">
          {intl.formatMessage({
            id: 'entity.ledger.status',
            defaultMessage: 'Status'
          })}
        </div>
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
      header: intl.formatMessage({
        id: 'entity.ledger.actions',
        defaultMessage: 'Actions'
      }),
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
              <Link href={`/ledgers/${row.original.id}`}>
                <DropdownMenuItem>
                  {intl.formatMessage({
                    id: 'common.edit',
                    defaultMessage: 'Edit'
                  })}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {intl.formatMessage({
                  id: 'common.deactivate',
                  defaultMessage: 'Deactivate'
                })}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-3"
                onClick={() =>
                  ledgersEvents.handleOpenDeleteSheet(row.original)
                }
              >
                <span>
                  {intl.formatMessage({
                    id: 'common.delete',
                    defaultMessage: 'Delete'
                  })}
                </span>
                <Trash size={16} className="text-shadcn-400" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </React.Fragment>
      )
    }
  ]
}
