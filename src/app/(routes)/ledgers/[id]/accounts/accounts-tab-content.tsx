import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useIntl } from 'react-intl'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { useAccountsWithPortfolios, useDeleteAccount } from '@/client/accounts'
import { Skeleton } from '@/components/ui/skeleton'
import useCustomToast from '@/hooks/use-custom-toast'
import { AccountType } from '@/types/accounts-type'
import { AccountSheet } from './accounts-sheet'
import { AccountsDataTable } from './accounts-data-table'
import { EntityDataTable } from '@/components/entity-data-table'
import { useQueryParams } from '@/hooks/use-query-params'
import { Pagination } from '@/components/pagination'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'
import { EmptyResource } from '@/components/empty-resource'
import { isNil } from 'lodash'

export const AccountsTabContent = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = useState<any>([])

  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({
    total
  })

  const {
    data: accountsData,
    refetch: refetchAccounts,
    isLoading: isAccountsLoading
  } = useAccountsWithPortfolios({
    organizationId: currentOrganization.id!,
    ledgerId: ledgerId,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(accountsData?.items?.length || 0)
  }, [accountsData?.items?.length])

  const accountsList: AccountType[] = useMemo(() => {
    return (
      accountsData?.items.map((account: any) => ({
        ...account,
        assetCode: account.assetCode,
        parentAccountId: account.parentAccountId,
        productId: account.productId,
        metadata: account.metadata,
        portfolioId: account.portfolio?.id,
        portfolioName: account.portfolio?.name
      })) || []
    )
  }, [accountsData])

  const { showSuccess, showError } = useCustomToast()

  const {
    handleDialogOpen,
    dialogProps,
    handleDialogClose,
    data: selectedAccount
  } = useConfirmDialog<AccountType>({
    onConfirm: () => deleteAccount(selectedAccount)
  })

  const { mutate: deleteAccount, isPending: deleteAccountPending } =
    useDeleteAccount({
      organizationId: currentOrganization.id!,
      ledgerId,
      accountId: selectedAccount?.id || '',
      onSuccess: () => {
        handleDialogClose()
        refetchAccounts()
        showSuccess(
          intl.formatMessage(
            {
              id: 'ledgers.toast.accountDeleted',
              defaultMessage: '{accountName} account successfully deleted'
            },
            { accountName: selectedAccount?.name! }
          )
        )
      },
      onError: () => {
        showError(
          intl.formatMessage({
            id: 'accounts.toast.delete.error',
            defaultMessage: 'Error deleting account'
          })
        )
      }
    })

  const {
    handleCreate,
    handleEdit: handleEditOriginal,
    sheetProps
  } = useCreateUpdateSheet<AccountType>()

  const handleEdit = (account: AccountType) => {
    handleEditOriginal(account)
  }

  const table = useReactTable({
    data: accountsList,
    columns: [
      { accessorKey: 'id', header: 'ID' },
      {
        accessorKey: 'name',
        header: intl.formatMessage({
          id: 'entity.account.name',
          defaultMessage: 'Account Name'
        })
      },
      {
        accessorKey: 'assetCode',
        header: intl.formatMessage({
          id: 'entity.account.currency',
          defaultMessage: 'Assets'
        }),
        cell: (info) => info.getValue() || '-'
      },
      {
        accessorKey: 'metadata',
        header: intl.formatMessage({
          id: 'common.metadata',
          defaultMessage: 'Metadata'
        }),
        cell: (info) => {
          const metadata = info.getValue() || {}
          const count = Object.keys(metadata).length
          return count > 0
            ? `${count} ${intl.formatMessage({ id: 'common.records', defaultMessage: 'records' })}`
            : '-'
        }
      },
      {
        accessorKey: 'portfolio.name',
        header: intl.formatMessage({
          id: 'common.portfolio',
          defaultMessage: 'Portfolio'
        }),
        cell: (info) => info.getValue() || '-'
      },
      {
        accessorKey: 'actions',
        header: intl.formatMessage({
          id: 'common.actions',
          defaultMessage: 'Actions'
        }),
        cell: () => null
      }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  return (
    <>
      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'ledgers.account.deleteDialog.title',
          defaultMessage: 'Are you sure?'
        })}
        description={intl.formatMessage({
          id: 'ledgers.account.deleteDialog.description',
          defaultMessage: 'You will delete an account'
        })}
        loading={deleteAccountPending}
        {...dialogProps}
      />

      <AccountSheet
        ledgerId={ledgerId}
        onSuccess={refetchAccounts}
        {...sheetProps}
      />

      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <EntityBox.Header
            title={intl.formatMessage({
              id: 'ledgers.accounts.title',
              defaultMessage: 'Accounts'
            })}
            subtitle={intl.formatMessage({
              id: 'ledgers.accounts.subtitle',
              defaultMessage: 'Manage the accounts of this ledger.'
            })}
          />
          <EntityBox.Actions>
            <Button onClick={handleCreate}>
              {intl.formatMessage({
                id: 'common.new.account',
                defaultMessage: 'New Account'
              })}
            </Button>
            <EntityBox.CollapsibleTrigger />
          </EntityBox.Actions>
        </EntityBox.Banner>
        <EntityBox.CollapsibleContent>
          <div className="col-start-3 flex flex-row justify-end">
            <PaginationLimitField control={form.control} />
          </div>
        </EntityBox.CollapsibleContent>
      </EntityBox.Collapsible>

      <EntityDataTable.Root>
        {isAccountsLoading && <Skeleton className="h-64" />}

        {isNil(
          accountsList?.length === 0 && (
            <EmptyResource
              message={intl.formatMessage({
                id: 'ledgers.accounts.emptyResource',
                defaultMessage: "You haven't created any Accounts yet"
              })}
            >
              <Button onClick={handleCreate}>
                {intl.formatMessage({
                  id: 'common.new.account',
                  defaultMessage: 'New Account'
                })}
              </Button>
            </EmptyResource>
          )
        )}

        {accountsList && (
          <AccountsDataTable
            accounts={{ items: accountsList }}
            isLoading={isAccountsLoading}
            table={table}
            handleEdit={handleEdit}
            onDelete={handleDialogOpen}
            refetch={refetchAccounts}
          />
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
                number: accountsList?.length,
                count: <span className="font-bold">{accountsList?.length}</span>
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </>
  )
}
