import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { EmptyResource } from '@/components/empty-resource'
import { Button } from '@/components/ui/button'
import { Plus, MoreVertical, Minus } from 'lucide-react'
import { capitalizeFirstLetter } from '@/helpers'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { isNil } from 'lodash'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import useCustomToast from '@/hooks/use-custom-toast'
import { AssetsSheet } from './assets-sheet'
import { useParams } from 'next/navigation'

type AssetsTableProps = {
  assets: { items: any[] }
  isLoading: boolean
  table: {
    getRowModel: () => {
      rows: { id: string; original: any }[]
    }
  }
  handleDialogOpen: (id: string, name: string) => void
  handleEdit: any
  refetch: () => void
}

type AssetRowProps = {
  asset: { id: string; original: any }
  handleCopyToClipboard: (value: string, message: string) => void
  handleDialogOpen: (id: string, name: string) => void
  handleEdit: any
}

const AssetRow: React.FC<AssetRowProps> = ({
  asset,
  handleDialogOpen,
  handleEdit
}) => {
  const intl = useIntl()
  const metadataCount = Object.entries(asset.original.metadata || []).length

  const assetTypesMessages = defineMessages({
    crypto: {
      id: 'assets.sheet.select.crypto',
      defaultMessage: 'Crypto'
    },
    commodity: {
      id: 'assets.sheet.select.commodity',
      defaultMessage: 'Commodity'
    },
    currency: {
      id: 'assets.sheet.select.currency',
      defaultMessage: 'Currency'
    },
    others: {
      id: 'assets.sheet.select.others',
      defaultMessage: 'Others'
    }
  })

  return (
    <TableRow key={asset.id}>
      <TableCell>{asset.original.name}</TableCell>
      <TableCell>
        {capitalizeFirstLetter(
          intl.formatMessage(
            assetTypesMessages[
              asset.original.type as keyof typeof assetTypesMessages
            ]
          )
        )}
      </TableCell>
      <TableCell>{asset.original.code}</TableCell>
      <TableCell>
        {metadataCount === 0 ? (
          <Minus size={20} />
        ) : (
          intl.formatMessage(
            {
              id: 'common.table.metadata',
              defaultMessage:
                '{number, plural, =0 {-} one {# record} other {# records}}'
            },
            {
              number: metadataCount
            }
          )
        )}
      </TableCell>
      <TableCell className="w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-auto w-max p-2">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(asset.original)}>
              {intl.formatMessage({
                id: `common.edit`,
                defaultMessage: 'Edit'
              })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                handleDialogOpen(
                  asset.original.id || '',
                  asset.original.name || ''
                )
              }
            >
              {intl.formatMessage({
                id: `common.delete`,
                defaultMessage: 'Delete'
              })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export const AssetsDataTable: React.FC<AssetsTableProps> = ({
  assets,
  table,
  handleDialogOpen,
  handleEdit,
  refetch
}) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <>
      <AssetsSheet ledgerId={ledgerId} onSuccess={refetch} {...sheetProps} />

      {isNil(assets?.items) || assets.items.length === 0 ? (
        <EmptyResource
          message={intl.formatMessage({
            id: 'ledgers.assets.emptyResource',
            defaultMessage: 'You have not created any assets yet.'
          })}
        >
          <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
            {intl.formatMessage({
              id: 'ledgers.assets.emptyResource.createButton',
              defaultMessage: 'New Asset'
            })}
          </Button>
        </EmptyResource>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.name',
                    defaultMessage: 'Name'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.type',
                    defaultMessage: 'Type'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.code',
                    defaultMessage: 'Code'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TableHead>
                <TableHead className="w-0">
                  {intl.formatMessage({
                    id: 'common.actions',
                    defaultMessage: 'Actions'
                  })}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((asset) => {
                return (
                  <AssetRow
                    key={asset.id}
                    asset={asset}
                    handleCopyToClipboard={handleCopyToClipboard}
                    handleDialogOpen={handleDialogOpen}
                    handleEdit={handleEdit}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
