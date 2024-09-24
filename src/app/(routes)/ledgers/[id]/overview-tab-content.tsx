import { Card } from '@/components/card'
import { TransactionCard } from './transaction-card'
import { TransactionStatusCard } from './transaction-status-card'
import { TotalAmountCard } from './total-amount-card'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import {
  useChartsTotalAmount,
  useChartsTotalTransactions,
  useChartsTransactionsByStatus
} from '@/utils/queries'
import { useState } from 'react'

type OverviewTabContentProps = {
  data: LedgerEntity
  onMetadataChange: any
}

export const OverviewTabContent = ({
  data,
  onMetadataChange
}: OverviewTabContentProps) => {
  const [metadata, setMetadata] = useState(data.metadata || [])
  const totalAmount = useChartsTotalAmount(data.id)
  const totalTransactions = useChartsTotalTransactions(data.id)
  const transactionsByStatus = useChartsTransactionsByStatus(data.id)

  const chartData = {
    labels: transactionsByStatus?.data?.data?.map(
      (status: { status: string; count: number }) => status.status
    ),
    datasets: transactionsByStatus?.data?.data?.map(
      (status: { status: string; count: number }) => status.count
    ),
    colors: ['#74DB9A', '#FFED89', '#FAA589']
  }

  const handleMetadataChange = (newMetadata: any) => {
    console.log(newMetadata)
    setMetadata(newMetadata)
    onMetadataChange(newMetadata)
  }

  return (
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
          <Card.Metadata data={{ metadata }} onChange={handleMetadataChange} />
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
  )
}
