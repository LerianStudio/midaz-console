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
import useCustomToast from '@/hooks/use-custom-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button/button'
import { OrganizationsType } from '@/types/organizations-type'

export type OrganizationsColumnsEvents = {
  handleClickId?: (id: string) => void
  handleClickLegalDocument?: (document: string) => void
  handleOpenEditSheet: (organizationData: OrganizationsType) => void
  handleOpenViewSheet: (organizationData: OrganizationsType) => void
  handleOpenDeleteSheet: (id: string) => void
}

type ColumnRow = {
  row: Row<OrganizationsType>
}

export const getOrganizationsColumns = (
  organizationsEvents: OrganizationsColumnsEvents,
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
      header: 'Organization ID',
      cell: ({ row }: ColumnRow) => {
        const id = row.original.id
        const displayId = id && id.length > 8 ? `${truncateString(id, 8)}` : id
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className="text-sm font-normal text-zinc-800 underline"
                  onClick={() => handleCopyToClipboard(id as string, 'copyId')}
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
      header: translateHeader('legalName'),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay: string = row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },

    {
      accessorKey: 'doingBusinessAs',
      header: translateHeader('doingBusinessAs'),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay =
          row.original.doingBusinessAs || row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },

    {
      accessorKey: 'legalDocument',
      header: translateHeader('legalDocument'),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.legalDocument
        return (
          <p
            onClick={() =>
              handleCopyToClipboard(legalDocument, 'copyLegalDocument')
            }
          >
            {legalDocument}
          </p>
        )
      }
    },

    {
      accessorKey: 'status',
      header: translateHeader('status'),
      cell: ({ row }: ColumnRow) => {
        const status = row.original.status.code
        return (
          <div className="inline-flex h-6 items-center justify-center rounded-xl bg-emerald-100 px-3 py-0.5">
            <p className="ext-center text-sm font-medium capitalize text-emerald-800">
              {status.toLowerCase()}
            </p>
          </div>
        )
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
                onClick={() =>
                  organizationsEvents.handleOpenViewSheet(row.original)
                }
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                organizationsEvents.handleOpenEditSheet(row.original)
              }
            >
              {translateHeader('edit')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{translateHeader('inactivate')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-3"
              onClick={() =>
                organizationsEvents.handleOpenDeleteSheet(
                  row.original.id as string
                )
              }
            >
              <span>{translateHeader('delete')}</span>
              <Trash size={16} className="text-shadcn-400" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]
}
