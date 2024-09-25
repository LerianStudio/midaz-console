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
import { useIntl } from 'react-intl'

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
  organizationsEvents: OrganizationsColumnsEvents
) => {
  const intl = useIntl()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)

    showInfo(message)
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
                  onClick={() =>
                    handleCopyToClipboard(
                      id as string,
                      intl.formatMessage({
                        id: 'organizations.toast.copyId',
                        defaultMessage:
                          'The id has been copied to your clipboard.'
                      })
                    )
                  }
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
      header: intl.formatMessage({
        id: `entity.organization.legalName`,
        defaultMessage: 'Legal Name'
      }),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay: string = row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },

    {
      accessorKey: 'doingBusinessAs',
      header: intl.formatMessage({
        id: `entity.organization.doingBusinessAs`,
        defaultMessage: 'Trade Name'
      }),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay =
          row.original.doingBusinessAs || row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },

    {
      accessorKey: 'legalDocument',
      header: intl.formatMessage({
        id: `entity.organization.legalDocument`,
        defaultMessage: 'Document'
      }),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.legalDocument
        return (
          <p
            onClick={() =>
              handleCopyToClipboard(
                legalDocument,
                intl.formatMessage({
                  id: 'organizations.toast.copyLegalDocument',
                  defaultMessage:
                    'The document number has been copied to your clipboard.'
                })
              )
            }
          >
            {legalDocument}
          </p>
        )
      }
    },

    {
      accessorKey: 'status',
      header: intl.formatMessage({
        id: `entity.organization.status`,
        defaultMessage: 'Status'
      }),
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
      header: intl.formatMessage({
        id: `organizations.columnsTable.actions`,
        defaultMessage: 'Actions'
      }),
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
              {intl.formatMessage({
                id: `common.edit`,
                defaultMessage: 'Edit'
              })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {intl.formatMessage({
                id: `common.inactivate`,
                defaultMessage: 'Inactivate'
              })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-3"
              onClick={() =>
                organizationsEvents.handleOpenDeleteSheet(
                  row.original.id as string
                )
              }
            >
              <span>
                {intl.formatMessage({
                  id: `common.delete`,
                  defaultMessage: 'Delete'
                })}
              </span>
              <Trash size={16} className="text-shadcn-400" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]
}
