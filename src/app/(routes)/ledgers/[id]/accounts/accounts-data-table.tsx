import React from 'react'
import { useIntl } from 'react-intl'

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody
} from '@/components/ui/table'
import { Minus, MoreVertical } from 'lucide-react'
import useCustomToast from '@/hooks/use-custom-toast'
import { isNil } from 'lodash'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Arrow } from '@radix-ui/react-tooltip'
import { truncateString } from '@/helpers'
import { Button } from '@/components/ui/button'
import { AccountType } from '@/types/accounts-type'

type AccountsTableProps = {
  accounts: { items: AccountType[] }
  isLoading: boolean
  table: {
    getRowModel: () => {
      rows: { id: string; original: AccountType }[]
    }
  }
  onDelete: (id: string, account: AccountType) => void
  refetch: () => void
  handleEdit: (account: AccountType) => void
}

type AccountRowProps = {
  account: { id: string; original: AccountType }
  handleEdit: (account: AccountType) => void
  handleCopyToClipboard: (value: string, message: string) => void
  onDelete: (id: string, account: AccountType) => void
}

const AccountRow: React.FC<AccountRowProps> = ({
  account,
  handleEdit,
  handleCopyToClipboard,
  onDelete
}) => {
  const intl = useIntl()
  const id = account.original.id || ''
  const displayId =
    account.original.id && account.original.id.length > 8
      ? `${truncateString(account.original.id, 8)}`
      : account.original.id
  const metadataCount = Object.entries(account.original.metadata || []).length

  const portfolioName = account.original.portfolio?.name ? (
    account.original.portfolio.name
  ) : (
    <Minus size={20} />
  )

  return (
    <TableRow key={account.id}>
      <TableCell>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger
              onClick={() =>
                handleCopyToClipboard(
                  id,
                  intl.formatMessage({
                    id: 'ledgers.toast.copyId',
                    defaultMessage: 'The id has been copied to your clipboard.'
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
      <TableCell>{account.original.name}</TableCell>
      <TableCell>{account.original.assetCode}</TableCell>
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
      <TableCell>{portfolioName}</TableCell>
      <TableCell className="w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-auto w-max p-2">
              <MoreVertical size={16} onClick={() => {}} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(account.original)}>
              {intl.formatMessage({
                id: `common.edit`,
                defaultMessage: 'Edit'
              })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                onDelete(account.original.id!, account.original)
              }}
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

export const AccountsDataTable: React.FC<AccountsTableProps> = ({
  accounts,
  table,
  onDelete,
  handleEdit
}) => {
  const intl = useIntl()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string, message: string) => {
    navigator.clipboard.writeText(value)
    showInfo(message)
  }

  return (
    <React.Fragment>
      {!isNil(accounts?.items) && accounts?.items.length > 0 && (
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
                    id: 'entity.account.name',
                    defaultMessage: 'Account Name'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'entity.account.currency',
                    defaultMessage: 'Assets'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TableHead>
                <TableHead>
                  {intl.formatMessage({
                    id: 'common.portfolio',
                    defaultMessage: 'Portfolio'
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
              {table.getRowModel().rows.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  handleEdit={handleEdit}
                  handleCopyToClipboard={handleCopyToClipboard}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  )
}
