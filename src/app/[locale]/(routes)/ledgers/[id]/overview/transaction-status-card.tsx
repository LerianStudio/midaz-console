import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart } from 'lucide-react'

export const TransactionStatusCard = ({
  isLoading,
  chartData
}: {
  isLoading: boolean
  chartData: any
}) =>
  isLoading ? (
    <Skeleton className="h-[358px] w-auto bg-zinc-200" />
  ) : (
    <Card.Root>
      <Card.Header
        title="Status das Transações"
        icon={BarChart}
        className="text-[#52525B]"
      />
      <Card.Chart data={chartData} />
    </Card.Root>
  )
