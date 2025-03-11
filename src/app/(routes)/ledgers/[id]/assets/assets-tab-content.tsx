import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import { EntityBox } from '@/components/entity-box'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useDeleteAsset, useListAssets } from '@/client/assets'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { AssetsDataTable } from './assets-data-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { LedgerType } from '@/types/ledgers-type'
import { AssetsSkeleton } from './assets-skeleton'
import { AssetsSheet } from './assets-sheet'
import { useParams } from 'next/navigation'
import { useConfirmDialog } from '@/components/confirmation-dialog/use-confirm-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog'
import useCustomToast from '@/hooks/use-custom-toast'
import { EntityDataTable } from '@/components/entity-data-table'
import { useQueryParams } from '@/hooks/use-query-params'
import { Pagination } from '@/components/pagination'
import { PaginationLimitField } from '@/components/form/pagination-limit-field'

type AssetsTabContentProps = {
  data: LedgerType
}

export const AssetsTabContent = ({ data }: AssetsTabContentProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = useState<any>([])
  const { showSuccess, showError } = useCustomToast()

  const { handleCreate, handleEdit, sheetProps } = useCreateUpdateSheet<any>()

  const [total, setTotal] = useState(0)

  const { form, searchValues, pagination } = useQueryParams({
    total
  })

  const {
    data: assets,
    refetch,
    isLoading
  } = useListAssets({
    organizationId: currentOrganization.id!,
    ledgerId: data?.id!,
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

  return (
    <>
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

      <EntityBox.Collapsible>
        <EntityBox.Banner>
          <EntityBox.Header
            title={intl.formatMessage({
              id: 'common.assets',
              defaultMessage: 'Assets'
            })}
            subtitle={intl.formatMessage({
              id: 'ledgers.assets.subtitle',
              defaultMessage: 'Manage the assets of this ledger.'
            })}
            tooltip={intl.formatMessage({
              id: 'ledgers.assets.tooltip',
              defaultMessage:
                'Currency or assets of any nature traded on this Ledger.'
            })}
          />
          <EntityBox.Actions className="gap-4">
            <Button onClick={handleCreate}>
              {intl.formatMessage({
                id: 'common.new.asset',
                defaultMessage: 'New Asset'
              })}
            </Button>
            <EntityBox.CollapsibleTrigger />
          </EntityBox.Actions>
        </EntityBox.Banner>
        <EntityBox.CollapsibleContent>
          <div className="col-start-3 flex justify-end">
            <PaginationLimitField control={form.control} />
          </div>
        </EntityBox.CollapsibleContent>
      </EntityBox.Collapsible>

      <AssetsSheet ledgerId={ledgerId} onSuccess={refetch} {...sheetProps} />

      <EntityDataTable.Root>
        {isLoading && <AssetsSkeleton />}

        {assets && (
          <AssetsDataTable
            assets={assets}
            isLoading={isLoading}
            table={table}
            handleDialogOpen={handleDialogOpen}
            handleEdit={handleEdit}
            refetch={refetch}
          />
        )}

        <EntityDataTable.Footer>
          <EntityDataTable.FooterText>
            {intl.formatMessage(
              {
                id: 'ledgers.assets.showing',
                defaultMessage:
                  '{number, plural, =0 {No asset found} one {Showing {count} asset} other {Showing {count} assets}}.'
              },
              {
                number: assets?.items?.length,
                count: (
                  <span className="font-bold">{assets?.items?.length}</span>
                )
              }
            )}
          </EntityDataTable.FooterText>
          <Pagination total={total} {...pagination} />
        </EntityDataTable.Footer>
      </EntityDataTable.Root>
    </>
  )
}
