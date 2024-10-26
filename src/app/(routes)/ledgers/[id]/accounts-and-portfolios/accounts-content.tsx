import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { EntityBox } from '@/components/entity-box'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { useDeletePortfolio, useListPortfolios } from '@/client/portfolios'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useIntl } from 'react-intl'
import { isNil } from 'lodash'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { AccountSheet } from './accounts-sheet'
import { useAllPortfoliosAccounts, useDeleteAccount } from '@/client/accounts'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountEntity, AccountsDataTable } from './accounts-data-table'

export interface AccountResponse {
  id: string
  ledgerId: string
  assetCode: string
  organizationId: string
  name: string
  alias: string
  type: string
  entityId: string
  parentAccountId: string
  portfolioId: string
  productId: string
  status: {
    code: string
    description: string
  }
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export const AccountsContent = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = React.useState<any>([])
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<AccountEntity | null>(
    null
  )

  const { data, refetch, isLoading } = useListPortfolios({
    organizationId: currentOrganization.id!,
    ledgerId: ledgerId
  })

  const {
    data: accountsData,
    refetch: refetchAccounts,
    isLoading: isAccountsLoading
  } = useAllPortfoliosAccounts({
    organizationId: currentOrganization.id!,
    ledgerId: ledgerId
  })

  const accountsList = useMemo(() => {
    return {
      items:
        accountsData?.items.flatMap((portfolio) =>
          portfolio.accounts.map((account) => ({
            ...account,
            portfolioName: portfolio.name,
            portfolioId: portfolio.id
          }))
        ) || []
    }
  }, [accountsData])

  console.log(accountsList)

  const { mutate: deleteAccount, isPending: deleteAccountPending } =
    useDeleteAccount({
      organizationId: currentOrganization.id!,
      ledgerId,
      accountId: selectedAccount?.id || '',
      portfolioId: selectedAccount?.portfolioId || '',
      onSuccess: () => {
        handleDialogClose()
        refetchAccounts()
      }
    })

  const {
    handleDialogOpen: originalHandleDialogOpen,
    dialogProps,
    handleDialogClose
  } = useConfirmDialog({
    onConfirm: (account) => {
      console.log(account)
      if (selectedAccount) {
        console.log(selectedAccount)
        deleteAccount(selectedAccount)
      }
    }
  })

  const handleAccountDialogOpen = (accountEntity: AccountEntity) => {
    setSelectedAccount(accountEntity)
    originalHandleDialogOpen(
      intl.formatMessage({
        id: 'ledgers.account.deleteDialog.title',
        defaultMessage: 'Are you sure?'
      })
    )
  }

  const {
    handleCreate,
    handleEdit: handleEditOriginal,
    sheetProps
  } = useCreateUpdateSheet<AccountResponse>()

  const handleEdit = (account: AccountEntity) => {
    handleEditOriginal(account as unknown as AccountResponse)
  }

  const table = useReactTable({
    data: accountsList?.items!,
    columns: [
      { accessorKey: 'id' },
      { accessorKey: 'name' },
      { accessorKey: 'assets' },
      { accessorKey: 'metadata' },
      { accessorKey: 'portfolio' },
      { accessorKey: 'actions' }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  const getLoadingSkeleton = () => (
    <React.Fragment>
      <Skeleton className="h-[84px] w-full bg-zinc-200" />
    </React.Fragment>
  )

  if (isLoading) {
    return getLoadingSkeleton()
  }

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

      <AccountSheet ledgerId={ledgerId} onSucess={refetch} {...sheetProps} />

      <EntityBox.Root>
        <EntityBox.Header
          title="Accounts"
          // subtitle={
          //   data?.items?.length !== undefined
          //     ? intl.formatMessage(
          //         {
          //           id: `ledgers.portfolio.subtitle`,
          //           defaultMessage: '{portfoliosItemsTotal} portfolios founded'
          //         },
          //         {
          //           portfoliosItemsTotal: data.items.length
          //         }
          //       )
          //     : undefined
          // }
        />
        <EntityBox.Actions>
          <Button
            variant="secondary"
            onClick={handleCreate}
            disabled={isNil(data?.items) || data?.items?.length === 0}
          >
            {data?.items?.length ? (
              <Plus />
            ) : (
              <>
                {intl.formatMessage({
                  id: `portfolio.create`,
                  defaultMessage: 'Create first portfolio'
                })}
                <Plus />
              </>
            )}
          </Button>
          {!isNil(data?.items) && data?.items.length > 0 && (
            <Button
              variant="white"
              onClick={() => setIsTableExpanded(!isTableExpanded)}
            >
              {isTableExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          )}
        </EntityBox.Actions>
      </EntityBox.Root>

      {accountsList && (
        <AccountsDataTable
          accounts={accountsList as { items: any[] }}
          isLoading={isAccountsLoading}
          table={table}
          handleEdit={handleEdit}
          handleDialogOpen={handleAccountDialogOpen}
          refetch={refetch}
          isTableExpanded={isTableExpanded}
        />
      )}
    </>
  )
}
