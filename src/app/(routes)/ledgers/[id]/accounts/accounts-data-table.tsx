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
import { MoreVertical } from 'lucide-react'
import { isNil } from 'lodash'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AccountType } from '@/types/accounts-type'
import { MetadataTableCell } from '../MetadataTableCell'
import { IdTableCell } from '@/components/id-table-cell'

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
  onDelete: (id: string, account: AccountType) => void
}

const AccountRow: React.FC<AccountRowProps> = ({
  account,
  handleEdit,
  onDelete
}) => {
  const intl = useIntl()

  return (
    <TableRow key={account.id}>
      <IdTableCell id={account.original.id} />
      <TableCell>{account.original.name}</TableCell>
      <TableCell align="center">{account.original.assetCode}</TableCell>
      <MetadataTableCell align="center" metadata={account.original.metadata} />
      <TableCell align="center">
        {account.original.portfolio?.name ?? (
          <Button variant="link" onClick={() => handleEdit(account.original)}>
            {intl.formatMessage({
              id: 'common.link',
              defaultMessage: 'Link'
            })}
          </Button>
        )}
      </TableCell>
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
                <TableHead className="text-center">
                  {intl.formatMessage({
                    id: 'common.assets',
                    defaultMessage: 'Assets'
                  })}
                </TableHead>
                <TableHead className="text-center">
                  {intl.formatMessage({
                    id: 'common.metadata',
                    defaultMessage: 'Metadata'
                  })}
                </TableHead>
                <TableHead className="text-center">
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
