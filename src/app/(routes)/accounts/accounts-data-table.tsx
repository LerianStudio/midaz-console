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
import { IdTableCell } from '@/components/id-table-cell'
import { MetadataTableCell } from '../ledgers/[id]/MetadataTableCell'
import { EntityDataTable } from '@/components/entity-data-table'
import { EmptyResource } from '@/components/empty-resource'
import { Pagination } from '@/components/pagination'
import { EntityBox } from '@/components/entity-box'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { FormProvider } from 'react-hook-form'

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
  total: any
  pagination: any
  form: any
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
  handleEdit,
  total,
  pagination,
  form
}) => {
  const intl = useIntl()

  return (
    <FormProvider {...form}>
      <EntityBox.Root>
        <EntityBox.Actions className="flex w-full justify-end gap-4">
          <div className="col-start-3 flex justify-end">
            <PaginationLimitField control={form.control} />
          </div>
        </EntityBox.Actions>
      </EntityBox.Root>

      <EntityDataTable.Root>
        {isNil(
          accounts?.items.length === 0 && (
            <EmptyResource
              message={intl.formatMessage({
                id: 'ledgers.accounts.emptyResource',
                defaultMessage: "You haven't created any Accounts yet"
              })}
            >
              <Button onClick={() => {}}>
                {intl.formatMessage({
                  id: 'common.new.account',
                  defaultMessage: 'New Account'
                })}
              </Button>
            </EmptyResource>
          )
        )}

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
                      id: 'entity.account.currency',
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

        <EntityDataTable.Footer>
          <EntityDataTable.FooterText>
            {intl.formatMessage(
              {
                id: 'ledgers.accounts.showing',
                defaultMessage:
                  '{number, plural, =0 {No accounts found} one {Showing {count} account} other {Showing {count} accounts}}.'
              },
              {
                number: accounts?.items.length,
                count: (
                  <span className="font-bold">{accounts?.items.length}</span>
                )
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </FormProvider>
  )
}
