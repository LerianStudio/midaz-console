'use client'

import { BottomDrawer } from '@/components/BottomDrawer'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { PageHeader } from '@/components/PageHeader'
import { TabsComponent } from '@/components/Tabs'
import { useFormState } from '@/context/LedgerDetailsContext'
import { LedgerEntity } from '@/core/domain/entities/LedgerEntity'
import useCustomToast from '@/hooks/useCustomToast'
import { useEffect, useRef, useState } from 'react'
import { MetadataItem, MetadataValues } from '@/types/MetadataType'
import { cn } from '@/lib/utils'
import { OverviewTabContent } from './overview-tab-content'

type LedgerDetailsViewProps = {
  data: LedgerEntity
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const { formData, isDirty, resetDirty } = useFormState()
  const { showSuccess } = useCustomToast()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (isDirty) {
      setIsSheetOpen(true)
    }
  }, [isDirty])

  const metadataFormRef = useRef<{
    submitForm: () => Promise<MetadataValues>
  }>(null)

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Ledgers', href: '/ledgers' },
    { name: 'Detalhe da Ledger' }
  ]

  const tabs = [
    {
      id: 1,
      value: 'overview',
      name: 'Visão Geral',
      content: <OverviewTabContent data={data} />
    },
    {
      id: 2,
      value: 'instruments',
      name: 'Instrumentos',
      content: <div>Instruments</div>
    }
  ]

  const handleGlobalSubmit = async () => {
    let metadataValues: MetadataValues = {
      metadata: []
    }

    if (metadataFormRef.current) {
      metadataValues = await metadataFormRef.current.submitForm()
    }

    const dataToSubmit = {
      name: formData.name,
      metadata: metadataValues.metadata.reduce(
        (acc: any, { key, value }: MetadataItem) => {
          acc[key] = value
          return acc
        },
        {}
      )
    }

    resetDirty()
    setIsSheetOpen(false)
    console.log(dataToSubmit)
    showSuccess('Alterações salvas com sucesso.')
  }

  const handleCancel = () => {
    setIsSheetOpen(false)
    resetDirty()
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
