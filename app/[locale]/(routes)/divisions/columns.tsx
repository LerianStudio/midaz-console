'use client'

import React from 'react'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { truncateString } from '@/helpers'
import { Row } from '@tanstack/react-table'
import { DivisionType } from '@/types/DivisionsType'
import { useTranslations } from 'next-intl'

type ColumnRow = {
  row: Row<DivisionType>
}

type GetDivisionColumnsParams = {
  handleOpenEditSheet: (divisionData: DivisionType) => void
  handleOpenViewSheet: (divisionData: DivisionType) => void
  handleClickId: (id: string) => void
  handleClickLegalDocument: (document: string) => void
  handleDeleteDivision: (divisionData: DivisionType) => void
}

export const getDivisionColumns = ({
  handleOpenEditSheet,
  handleOpenViewSheet,
  handleClickId,
  handleClickLegalDocument,
  handleDeleteDivision
}: GetDivisionColumnsParams) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('divisions.columnsTable')

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
                <p onClick={() => handleClickId(id)}>{displayId}</p>
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
      accessorKey: 'doingBusinessAs',
      header: t('name'),
      cell: ({ row }: ColumnRow) => {
        const nameToDisplay =
          row.original.doingBusinessAs || row.original.legalName
        return <p>{nameToDisplay}</p>
      }
    },
    {
      accessorKey: 'legalDocument',
      header: t('legalDocument'),
      cell: ({ row }: ColumnRow) => {
        const legalDocument = row.original.legalDocument
        return (
          <p onClick={() => handleClickLegalDocument(legalDocument)}>
            {legalDocument}
          </p>
        )
      }
    },
    {
      accessorKey: 'status',
      header: t('status')
    },
    {
      header: t('edit'),
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-3">
          <Pencil
            className="h-4 w-4 cursor-pointer"
            onClick={() => handleOpenEditSheet(row.original)}
          />
        </div>
      )
    },
    {
      header: t('delete'),
      cell: ({ row }: ColumnRow) => (
        <div className="flex pl-4">
          <Trash2
            className="h-4 w-4 cursor-pointer"
            onClick={() => handleDeleteDivision(row.original)}
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
            onClick={() => handleOpenViewSheet(row.original)}
          />
        </div>
      )
    }
  ]
}
