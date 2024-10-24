import React from 'react'
import { useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { EntityBox } from '@/components/entity-box'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListAssets } from '@/client/assets-client'
import { useCreateUpdateSheet } from '@/components/sheet/use-create-update-sheet'
import { AssetsDataTable } from './assets-data-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ILedgerType } from '@/types/ledgers-type'
import { AssetsSkeleton } from './assets-skeleton'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import { AssetsSheet } from './assets-sheet'
import { useParams } from 'next/navigation'

type AssetsTabContentProps = {
  data: ILedgerType
}

export const AssetsTabContent = ({ data }: AssetsTabContentProps) => {
  const intl = useIntl()
  const { id: ledgerId } = useParams<{ id: string }>()
  const { currentOrganization } = useOrganization()
  const [columnFilters, setColumnFilters] = React.useState<any>([])

  const { handleCreate, sheetProps } = useCreateUpdateSheet<any>()

  const {
    data: assets,
    refetch,
    isLoading
  } = useListAssets({
    organizationId: currentOrganization.id!,
    ledgerId: data?.id!
  })

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

  const handleSubmit = async () => {}

  return (
    <div>
      <EntityBox.Root>
        <EntityBox.Header
          title={intl.formatMessage({
            id: 'ledgers.assets.title',
            defaultMessage: 'Assets'
          })}
          subtitle={intl.formatMessage({
            id: 'ledgers.assets.subtitle',
            defaultMessage:
              'Currency or assets of any nature traded on this Ledger.'
          })}
        />
        <EntityBox.Actions>
          {!assets || assets.items.length === 0 ? (
            <Button variant="outline" onClick={handleCreate} icon={<Plus />}>
              {intl.formatMessage({
                id: 'ledgers.assets.createButton',
                defaultMessage: 'Create your first Asset'
              })}
            </Button>
          ) : (
            <React.Fragment>
              <InputWithIcon
                placeholder={intl.formatMessage({
                  id: 'common.filter',
                  defaultMessage: 'Filter'
                })}
                value={
                  (table.getColumn('name')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('name')?.setFilterValue(event.target.value)
                }
                className="w-full min-w-[300px]"
                icon={<Search />}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  console.log('clicked')
                }}
              >
                <Plus />
              </Button>
            </React.Fragment>
          )}
        </EntityBox.Actions>
      </EntityBox.Root>

      <AssetsSheet ledgerId={ledgerId} onSuccess={refetch} {...sheetProps} />

      {isLoading && <AssetsSkeleton />}

      {assets && (
        <AssetsDataTable
          assets={assets}
          isLoading={isLoading}
          table={table}
          handleDialogOpen={() => {}}
          refetch={refetch}
        />
      )}
    </div>
  )
}
