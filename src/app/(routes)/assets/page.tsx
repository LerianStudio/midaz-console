'use client'

import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useDeleteAsset, useListAssets } from '@/client/assets'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog'
import useCustomToast from '@/hooks/use-custom-toast'
import { useQueryParams } from '@/hooks/use-query-params'
import { AssetsSheet } from './assets-sheet'
import { AssetsSkeleton } from './assets-skeleton'
import { AssetsDataTable } from './assets-data-table'
import { PageHeader } from '@/components/page-header'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { Breadcrumb } from '@/components/breadcrumb'

const Page = () => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const [columnFilters, setColumnFilters] = useState<any>([])
  const { currentOrganization, currentLedgerId } = useOrganization()
  const { showSuccess, showError } = useCustomToast()
  const { handleCreate, handleEdit, sheetProps } = useCreateUpdateSheet<any>()
  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({ total })

  console.log('currentOrg-> ', currentOrganization)
  console.log('currentLedger-> ', currentLedgerId)

  const {
    data: assets,
    refetch,
    isLoading
  } = useListAssets({
    organizationId: currentOrganization.id!,
    ledgerId: currentLedgerId,
    ...(searchValues as any)
  })

  useEffect(() => {
    setTotal(assets?.items.length || 0)
  }, [assets?.items.length])

  const { mutate: deleteMutate, isPending: deletePending } = useDeleteAsset({
    organizationId: currentOrganization.id!,
    ledgerId,
    onSuccess: () => {
      handleDialogClose()
      refetch()
      showSuccess(
        intl.formatMessage({
          id: 'assets.toast.delete.success',
          defaultMessage: 'Asset successfully deleted'
        })
      )
    },
    onError: () => {
      handleDialogClose()
      showError(
        intl.formatMessage({
          id: 'assets.toast.delete.error',
          defaultMessage: 'Error deleting Asset'
        })
      )
    }
  })

  const { handleDialogOpen, dialogProps, handleDialogClose } = useConfirmDialog(
    {
      onConfirm: (id: string) => deleteMutate({ id })
    }
  )

  const table = useReactTable({
    data: assets?.items!,
    columns: [
      { accessorKey: 'name' },
      { accessorKey: 'type' },
      { accessorKey: 'code' },
      { accessorKey: 'metadata' },
      { accessorKey: 'actions' }
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: currentOrganization.legalName
    },
    {
      name: intl.formatMessage({
        id: `ledgers.title`,
        defaultMessage: 'Ledgers'
      })
    },
    {
      name: intl.formatMessage({
        id: `common.assets`,
        defaultMessage: 'Assets'
      })
    }
  ])

  const assetsProps = {
    assets,
    table,
    handleDialogOpen,
    handleEdit,
    refetch,
    form,
    pagination,
    total
  }

  return (
    <React.Fragment>
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'common.assets',
              defaultMessage: 'Assets'
            })}
            subtitle={intl.formatMessage({
              id: 'assets.subtitle',
              defaultMessage:
                'View, edit, and manage the assets of the current ledger.'
            })}
          />

          <PageHeader.ActionButtons>
            <PageHeader.CollapsibleInfoTrigger
              question={intl.formatMessage({
                id: 'assets.helperTrigger.question',
                defaultMessage: 'What is a Asset?'
              })}
            />

            <Button onClick={handleCreate} data-testid="new-ledger">
              {intl.formatMessage({
                id: 'assets.listingTemplate.addButton',
                defaultMessage: 'New Asset'
              })}
            </Button>
          </PageHeader.ActionButtons>
        </PageHeader.Wrapper>

        <PageHeader.CollapsibleInfo
          question={intl.formatMessage({
            id: 'assets.helperTrigger.question',
            defaultMessage: 'What is a Asset?'
          })}
          answer={intl.formatMessage({
            id: 'assets.helperTrigger.answer',
            defaultMessage:
              'Book with the record of all transactions and operations of the Organization.'
          })}
          seeMore={intl.formatMessage({
            id: 'common.read.docs',
            defaultMessage: 'Read the docs'
          })}
        />
      </PageHeader.Root>

      <ConfirmationDialog
        title={intl.formatMessage({
          id: 'common.confirmDeletion',
          defaultMessage: 'Confirm Deletion'
        })}
        description={intl.formatMessage({
          id: 'assets.delete.description',
          defaultMessage:
            'You are about to permanently delete this asset. This action cannot be undone. Do you wish to continue?'
        })}
        loading={deletePending}
        {...dialogProps}
      />

      <AssetsSheet ledgerId={ledgerId} onSuccess={refetch} {...sheetProps} />

      <div className="mt-10">
        {isLoading && <AssetsSkeleton />}

        {assets && <AssetsDataTable {...assetsProps} />}
      </div>
    </React.Fragment>
  )
}

export default Page
