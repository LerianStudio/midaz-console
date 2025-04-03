'use client'

import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import React from 'react'
import { useIntl } from 'react-intl'
import { EntityBox } from '@/components/entity-box'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { EntityDataTable } from '@/components/entity-data-table'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { UsersSheet } from './users-sheet'
import { useListUsers } from '@/client/users'
import { Skeleton } from '@/components/ui/skeleton'

export const UsersTabContent = () => {
  const intl = useIntl()
  const { data: users, refetch, isLoading } = useListUsers({})
  const { handleCreate, handleEdit, sheetProps } = useCreateUpdateSheet<any>({
    enableRouting: true
  })

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {}
  )

  return (
    <div>
      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'common.confirmDeletion',
          defaultMessage: 'Confirm Deletion'
        })}
        description={intl.formatMessage({
          id: 'organizations.delete.description',
          defaultMessage:
            'You are about to permanently delete this organization. This action cannot be undone. Do you wish to continue?'
        })}
        loading={false}
        {...dialogProps}
      />

      <EntityBox.Root>
        <EntityBox.Header
          title={intl.formatMessage({
            id: 'users.title',
            defaultMessage: 'Users'
          })}
          subtitle={intl.formatMessage({
            id: 'users.subtitle',
            defaultMessage: 'Manage the users of Midaz.'
          })}
          tooltip={intl.formatMessage({
            id: 'users.tooltip',
            defaultMessage:
              'Users who will be able to interact with the Organizations and Ledgers you create.'
          })}
        />

        <EntityBox.Actions>
          <Button onClick={handleCreate}>
            {intl.formatMessage({
              id: 'users.listingTemplate.addButton',
              defaultMessage: 'New User'
            })}
          </Button>
        </EntityBox.Actions>
      </EntityBox.Root>

      {isLoading && <Skeleton className="mt-4 h-[390px] w-full bg-zinc-200" />}

      {!isLoading && users?.length > 0 && (
        <EntityDataTable.Root>
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
                      id: `common.email`,
                      defaultMessage: 'Email'
                    })}
                  </TableHead>
                  <TableHead>
                    {intl.formatMessage({
                      id: `entity.user.groups`,
                      defaultMessage: 'Group'
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
                {users?.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.groups[0]}</TableCell>
                    <TableCell align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            className="h-auto w-max p-2"
                          >
                            <MoreVertical size={16} onClick={() => {}} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(user)}>
                            {intl.formatMessage({
                              id: `common.edit`,
                              defaultMessage: 'Edit'
                            })}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDialogOpen(user.id!)}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <EntityDataTable.Footer>
            <EntityDataTable.FooterText>
              {intl.formatMessage(
                {
                  id: 'users.showing',
                  defaultMessage:
                    'Showing {count} {number, plural, =0 {users} one {user} other {users}}.'
                },
                {
                  number: users?.length,
                  count: <span className="font-bold">{users?.length}</span>
                }
              )}
            </EntityDataTable.FooterText>
          </EntityDataTable.Footer>
        </EntityDataTable.Root>
      )}

      <UsersSheet {...sheetProps} />
    </div>
  )
}
