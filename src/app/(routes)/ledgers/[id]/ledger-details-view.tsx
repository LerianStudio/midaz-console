'use client'

import { BottomDrawer } from '@/components/bottom-drawer'
import { Breadcrumb, BreadcrumbPath } from '@/components/breadcrumb'
import { PageHeader } from '@/components/page-header'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import useCustomToast from '@/hooks/use-custom-toast'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { OverviewTabContent } from './overview-tab-content'
import { Skeleton } from '@/components/ui/skeleton'
import { useUpdateLedger } from '@/hooks/ledgers/use-update-ledger'
import { useQueryClient } from '@tanstack/react-query'
import { useFormState } from '@/context/form-details-context'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useIntl } from 'react-intl'

type LedgerDetailsViewProps = {
  data: LedgerEntity
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const intl = useIntl()
  const { formData, isDirty, resetDirty } = useFormState()
  const { showSuccess, showError } = useCustomToast()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [metadata, setMetadata] = useState<{ key: string; value: string }[]>([])
  const [isMetadataDirty, setIsMetadataDirty] = useState(false)
  const [resetMetadataFormTrigger, setResetMetadataFormTrigger] =
    useState(false)
  const updateLedger = useUpdateLedger()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isDirty || isMetadataDirty) {
      setIsSheetOpen(true)
    } else {
      setIsSheetOpen(false)
    }
  }, [isDirty, isMetadataDirty])

  useEffect(() => {
    if (data && data.metadata) {
      const metadataArray = Object.entries(data.metadata).map(
        ([key, value]) => ({
          key,
          value
        })
      )
      setMetadata(metadataArray)
    }
  }, [data])

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Ledgers', href: '/ledgers' },
    { name: 'Detalhe da Ledger' }
  ]

  const metadataObject =
    metadata.length > 0
      ? metadata.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {})
      : null

  const handleGlobalSubmit = async () => {
    const currentDateTime = new Date().toISOString()

    const dataToSubmit = {
      id: data.id,
      organizationId: 'cc15194a-6bc9-4ebb-b15d-43411a54ba4b',
      name: formData.name || data.name,
      metadata: metadataObject,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: currentDateTime,
      deletedAt: data.deletedAt
    }

    try {
      await updateLedger(data.id, dataToSubmit)
      queryClient.invalidateQueries({ queryKey: ['ledger', data.id] })
      resetDirty()
      setIsMetadataDirty(false)
      setResetMetadataFormTrigger((prev) => !prev)
      showSuccess('Alterações salvas com sucesso.')
    } catch (error) {
      showError('Erro ao salvar alterações.')
    }
  }

  const handleCancel = () => {
    setIsSheetOpen(false)
    resetDirty()
    setIsMetadataDirty(false)
    setResetMetadataFormTrigger((prev) => !prev)
  }

  if (!data) {
    return (
      <React.Fragment>
        <Breadcrumb paths={breadcrumbPaths} />

        <div className="mt-12 flex h-[125px] w-full flex-col gap-4 border-b">
          <Skeleton className="h-10 w-80 bg-zinc-200" />
          <Skeleton className="h-5 w-80 bg-zinc-200" />
        </div>

        <div className="mt-6 flex w-full gap-4">
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
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <div className="flex justify-between border-b">
          <PageHeader.InfoTitle title={data.name} subtitle={data.id}>
            <PageHeader.InfoTooltip subtitle={data.id} />
          </PageHeader.InfoTitle>
          <PageHeader.ActionButtons>
            <PageHeader.StatusButton />
          </PageHeader.ActionButtons>
        </div>
      </PageHeader.Root>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            {intl.formatMessage({
              id: 'ledgers.tab.overview',
              defaultMessage: 'Overview'
            })}
          </TabsTrigger>
          <TabsTrigger value="assets">
            {intl.formatMessage({
              id: 'ledgers.tab.assets',
              defaultMessage: 'Assets'
            })}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTabContent
            data={data}
            onMetadataChange={setMetadata}
            onMetadataDirtyChange={setIsMetadataDirty}
            resetMetadataFormTrigger={resetMetadataFormTrigger}
          />
        </TabsContent>
        <TabsContent value="assets">
          <p>Assets</p>
        </TabsContent>
      </Tabs>

      <BottomDrawer
        isOpen={isSheetOpen}
        handleSubmit={handleGlobalSubmit}
        handleCancel={handleCancel}
      />
    </div>
  )
}

export default LedgerDetailsView
