'use client'

import { BottomDrawer } from '@/components/BottomDrawer'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { Card } from '@/components/Card'
import { PageHeader } from '@/components/PageHeader'
import { TabsComponent } from '@/components/Tabs'
import { useFormState } from '@/context/FormDetailsContext'
import { LedgerEntity } from '@/core/domain/entities/LedgerEntity'
import useCustomToast from '@/hooks/useCustomToast'
import {
  useChartsTotalAmount,
  useChartsTotalTransactions,
  useChartsTransactionsByStatus
} from '@/utils/queries'
import { useEffect, useRef, useState } from 'react'
import { TransactionCard } from './transaction-card'
import { TransactionStatusCard } from './transaction-status-card'
import { TotalAmountCard } from './total-amount-card'
import { MetadataItem, MetadataValues } from '@/types/MetadataType'
import { cn } from '@/lib/utils'

type LedgerDetailsViewProps = {
  data: LedgerEntity
}

const LedgerDetailsView = ({ data }: LedgerDetailsViewProps) => {
  const { formData, isDirty, resetDirty } = useFormState()
  const { showSuccess } = useCustomToast()
  const totalAmount = useChartsTotalAmount(data.id)
  const totalTransactions = useChartsTotalTransactions(data.id)
  const transactionsByStatus = useChartsTransactionsByStatus(data.id)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const chartData = {
    labels: transactionsByStatus?.data?.data?.map(
      (status: { status: string; count: number }) => status.status
    ),
    datasets: transactionsByStatus?.data?.data?.map(
      (status: { status: string; count: number }) => status.count
    ),
    colors: ['#74DB9A', '#FFED89', '#FAA589']
  }

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

  const tabs = [{ id: 1, value: 'overview', name: 'Visão Geral' }]

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

      <TabsComponent tabs={tabs}>
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <Card.Root>
              <Card.Header
                title="Identificação"
                className="text-lg font-semibold capitalize text-[#52525B]"
              />

              <Card.Content data={data} />
            </Card.Root>

            <Card.Root>
              <Card.Header title="Metadados" className="text-lg capitalize" />
              <Card.Metadata data={data} ref={metadataFormRef} />
            </Card.Root>

            <Card.Root className="py-4">
              <Card.Header title="Recursos" />
              <Card.Resources />
            </Card.Root>
          </div>

          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <TransactionCard
                isLoading={totalTransactions.isLoading}
                count={totalTransactions?.data?.data[0]?.count}
              />

              <TransactionStatusCard
                isLoading={transactionsByStatus.isLoading}
                chartData={chartData}
              />
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <TotalAmountCard
                isLoading={totalAmount.isLoading}
                data={totalAmount?.data?.data}
              />
            </div>
          </div>
        </div>
      </TabsComponent>

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
