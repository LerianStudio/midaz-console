import React from 'react'
import { IntlShape, useIntl } from 'react-intl'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Arrow } from '@radix-ui/react-tooltip'
import { capitalizeFirstLetter, truncateString } from '@/helpers'
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
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { LedgersSheet } from './ledgers-sheet'
import { AssetsSheet } from './[id]/assets/assets-sheet'

type LedgersTableProps = {
  ledgers: { items: LedgerEntity[] }
  isLoading: boolean
  table: {
    getRowModel: () => {
      rows: { id: string; original: LedgerEntity }[]
    }
  }
  handleDialogOpen: (id: string, name: string) => void
  refetch: () => void
}

type LedgerRowProps = {
  ledger: { id: string; original: LedgerEntity }
  handleCopyToClipboard: (value: string, message: string) => void
  handleDialogOpen: (id: string, name: string) => void
  refetch: () => void
}

const LedgerRow: React.FC<LedgerRowProps> = ({
  ledger,
  handleCopyToClipboard,
  handleDialogOpen,
  refetch
}) => {
  const intl = useIntl()
  const id = ledger.original.id || ''
  const displayId = id && id.length > 8 ? `${truncateString(id, 8)}` : id
  const status = ledger.original.status
  const badgeVariant = status.code === 'ACTIVE' ? 'active' : 'inactive'
  const metadataCount = Object.entries(ledger.original.metadata || []).length
  const assetsItems = ledger.original.assets || []
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()

  return (
    <React.Fragment>
      <TableRow key={ledger.id}>
        <TableCell>
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
        </TableCell>
        <TableCell>{ledger.original.name}</TableCell>
        <TableCell>
          {assetsItems.length > 0 ? (
            <p>
              {truncateString(
                assetsItems.map((asset) => asset.code).join(', '),
                13
              )}
            </p>
          ) : (
            <Button
              variant="link"
              className="h-fit px-0 py-0"
              onClick={handleCreate}
            >
              <p className="text-shadcn-600 underline">
                {intl.formatMessage({
                  id: 'common.add',
                  defaultMessage: 'Add'
                })}
              </p>
            </Button>
          )}
        </TableCell>
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
        <TableCell>
          <div className="text-center">
            <Badge variant={badgeVariant}>
              {capitalizeFirstLetter(status.code)}
            </Badge>
          </div>
        </TableCell>
        <TableCell className="w-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-auto w-max p-2">
                <MoreVertical size={16} onClick={() => {}} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/ledgers/${ledger.original.id}`}>
                <DropdownMenuItem>
                  {intl.formatMessage({
                    id: `common.edit`,
                    defaultMessage: 'Edit'
                  })}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleDialogOpen(
                    ledger.original.id || '',
                    ledger.original.name || ''
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

      <AssetsSheet
        onSuccess={refetch}
        ledgerId={ledger.original.id!}
        {...sheetProps}
      />
    </React.Fragment>
  )
}

export const LedgersDataTable: React.FC<LedgersTableProps> = ({
  ledgers,
  table,
  handleDialogOpen,
  refetch
}) => {
  const intl = useIntl()
  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <div>
      {isNil(ledgers?.items) || ledgers.items.length === 0 ? (
        <EmptyResource
          message={intl.formatMessage({
            id: 'ledgers.emptyResource',
            defaultMessage: "You haven't created any Ledger yet"
          })}
          extra={intl.formatMessage({
            id: 'ledgers.emptyResourceExtra',
            defaultMessage: 'No Ledger found.'
          })}
        >
          <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
            {intl.formatMessage({
              id: 'ledgers.emptyResource.createButton',
              defaultMessage: 'New Ledger'
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
                    id: 'common.id',
                    defaultMessage: 'ID'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'entity.ledger.name',
                    defaultMessage: 'Ledger Name'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'entity.ledger.asset',
                    defaultMessage: 'Assets'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TableHead>
                <TableHead className="text-center">
                  {intl.formatMessage({
                    id: 'entity.ledger.status',
                    defaultMessage: 'Status'
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
              {table.getRowModel().rows.map((ledger) => (
                <LedgerRow
                  key={ledger.id}
                  ledger={ledger}
                  handleCopyToClipboard={handleCopyToClipboard}
                  handleDialogOpen={handleDialogOpen}
                  refetch={refetch}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <LedgersSheet onSuccess={refetch} {...sheetProps} />
    </div>
  )
}
