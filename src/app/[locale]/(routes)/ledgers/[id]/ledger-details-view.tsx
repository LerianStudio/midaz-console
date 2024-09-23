'use client'

import { BottomDrawer } from '@/components/bottom-drawer'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import { TabsComponent } from '@/components/tabs'
import { useFormState } from '@/context/form-details-context'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import useCustomToast from '@/hooks/use-custom-toast'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { OverviewTabContent } from './overview-tab-content'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountsPortfoliosTabContent } from './accounts-and-portfolios/accounts-portfolios-tab-content'

type LedgerDetailsViewProps = {
  data: LedgerEntity
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const { formData, isDirty, resetDirty } = useFormState()
  const { showSuccess } = useCustomToast()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [metadata, setMetadata] = useState<{ key: string; value: string }[]>([])

  useEffect(() => {
    if (isDirty) {
      setIsSheetOpen(true)
    }
  }, [isDirty])

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Ledgers', href: '/ledgers' },
    { name: 'Detalhe da Ledger' }
  ]

  const handleGlobalSubmit = () => {
    const dataToSubmit = {
      ...formData,
      metadata: metadata.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value }),
        {}
      )
    }

    resetDirty()
    console.log('Data to submit:', dataToSubmit)
    showSuccess('Alterações salvas com sucesso.')
  }

  const tabs = [
    {
      id: 1,
      value: 'overview',
      name: 'Visão Geral',
      content: data && (
        <OverviewTabContent data={data} onMetadataChange={setMetadata} />
      )
    },
    {
      id: 2,
      value: 'instruments',
      name: 'Instrumentos',
      content: <div>Instruments</div>
    },
    {
      id: 3,
      value: 'accountsportfolios',
      name: 'Contas e Portfólios',
      content: <AccountsPortfoliosTabContent />
    }
  ]

  const handleCancel = () => {
    setIsSheetOpen(false)
    resetDirty()
  }

  if (!data) {
    return (
      <React.Fragment>
        <BreadcrumbComponent paths={breadcrumbPaths} />

        <div className="mt-12 flex h-[125px] w-full flex-col gap-4 border-b">
          <Skeleton className="h-10 w-80 bg-zinc-200" />
          <Skeleton className="h-5 w-80 bg-zinc-200" />
        </div>

        <div className="mt-6 flex w-full gap-4">
          <Skeleton className="h-10 w-24 bg-zinc-200" />
          <Skeleton className="h-10 w-24 bg-zinc-200" />
          <Skeleton className="h-10 w-24 bg-zinc-200" />
        </div>

        <div className="mt-4 flex gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <Skeleton className="h-[168px] bg-zinc-200" />
            <Skeleton className="h-[168px] bg-zinc-200" />
            <Skeleton className="h-[94px] bg-zinc-200" />
          </div>

          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <Skeleton className="h-[134px] bg-zinc-200" />
              <Skeleton className="h-[350px] bg-zinc-200" />
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <Skeleton className="h-[134px] bg-zinc-200" />
              <Skeleton className="h-[134px] bg-zinc-200" />
              <Skeleton className="h-[134px] bg-zinc-200" />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className={cn('', isDirty && 'pb-40')}>
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <PageHeader.Root>
        <div className="flex justify-between border-b">
          <PageHeader.InfoTitle title={data.name} subtitle={data.id}>
            <PageHeader.InfoTooltip subtitle={data.id} />
          </PageHeader.InfoTitle>
          <PageHeader.ActionButtons type="entity" />
        </div>
      </PageHeader.Root>

      <TabsComponent tabs={tabs} />

      {isDirty && (
        <BottomDrawer
          isOpen={isSheetOpen}
          handleSubmit={handleGlobalSubmit}
          handleCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default LedgerDetailsView
