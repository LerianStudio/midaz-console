'use client'

import { BottomSheet } from '@/components/BottomSheet'
import { BreadcrumbComponent, BreadcrumbPath } from '@/components/Breadcrumb'
import { Card } from '@/components/Card'
import { PageHeader } from '@/components/PageHeader'
import { TabsComponent } from '@/components/Tabs'
import { useFormState } from '@/context/LedgerDetailsContext'
import { LedgerEntity } from '@/domain/entities/LedgerEntity'
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

type Metadata = {
  key: string
  value: string
}

type SubmitFormResponse = {
  metadata: Metadata[]
}

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
    submitForm: () => Promise<SubmitFormResponse>
  }>(null)

  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Ledgers', href: '/ledgers' },
    { name: 'Detalhe da Ledger' }
  ]

  const tabs = [{ id: 1, value: 'overview', name: 'Visão Geral' }]

  const handleGlobalSubmit = async () => {
    let metadataValues: SubmitFormResponse = {
      metadata: []
    }

    if (metadataFormRef.current) {
      metadataValues = await metadataFormRef.current.submitForm()
    }

    const dataToSubmit = {
      name: formData.name,
      metadata: metadataValues.metadata.reduce(
        (acc: any, { key, value }: Metadata) => {
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
    <div className="pb-20">
      <BreadcrumbComponent paths={breadcrumbPaths} />

      <div className="mt-12">
        <PageHeader title={data.name} subtitle={data.id} type="entity" />
      </div>

      <TabsComponent tabs={tabs}>
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col gap-5">
            <Card.Root>
              <Card.Header
                title="Identificação"
                className="text-lg font-semibold capitalize text-[#52525B]"
              />

              <Card.Content data={data} />
            </Card.Root>

            <Card.Root>
              <Card.Header title="Metadados" className="text-lg" />
              <Card.Metadata data={data} ref={metadataFormRef} />
            </Card.Root>

            <Card.Root>
              <Card.Header title="Recursos" />
              <Card.Resources />
            </Card.Root>
          </div>

          <div className="flex flex-1 gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <TransactionCard
                isLoading={totalTransactions.isLoading}
                count={totalTransactions?.data?.data[0]?.count}
              />

              <TransactionStatusCard
                isLoading={transactionsByStatus.isLoading}
                chartData={chartData}
              />
            </div>

            <div className="flex flex-1 flex-col gap-5">
              <TotalAmountCard
                isLoading={totalAmount.isLoading}
                data={totalAmount?.data?.data}
              />
            </div>
          </div>
        </div>
      </TabsComponent>

      {isDirty && (
        <BottomSheet
          isOpen={isSheetOpen}
          handleSubmit={handleGlobalSubmit}
          handleCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default LedgerDetailsView
