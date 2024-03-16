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
import { DivisionData } from './page'

type ColumnRow = {
  row: Row<DivisionData>
}

type GetDivisionColumnsParams = {
  handleOpenEditSheet: (divisionData: DivisionData) => void
  handleOpenViewSheet: (divisionData: DivisionData) => void
  handleClickId: (id: string) => void
  handleClickLegalDocument: (document: string) => void
  handleDeleteDivision: (divisionData: DivisionData) => void
}

export const getDivisionColumns = ({
  handleOpenEditSheet,
  handleOpenViewSheet,
  handleClickId,
  handleClickLegalDocument,
  handleDeleteDivision
}: GetDivisionColumnsParams) => [
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
    header: 'Name',
    cell: ({ row }: ColumnRow) => {
      const nameToDisplay =
        row.original.doingBusinessAs || row.original.legalName
      return <p>{nameToDisplay}</p>
    }
  },
  {
    accessorKey: 'legalDocument',
    header: 'Legal document',
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
    header: 'Status'
  },
  {
    header: 'Editar',
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
    header: 'Deletar',
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
