import { Card } from '@/components/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Coins } from 'lucide-react'

type ChartData = {
  instrumentCode: string
  totalAmount: string
}

export const TotalAmountCard = ({
  isLoading,
  data
}: {
  isLoading: boolean
  data: any
}) =>
  isLoading ? (
    <div className="flex flex-1 flex-col gap-6">
      <Skeleton className="h-[134px] bg-zinc-200" />
      <Skeleton className="h-[134px] bg-zinc-200" />
      <Skeleton className="h-[134px] bg-zinc-200" />
    </div>
  ) : (
    data.map((instrument: ChartData, index: number) => (
      <Card.Root key={instrument.instrumentCode}>
        <Card.Header
          title={`Total ${instrument.instrumentCode}`}
          icon={Coins}
          className="text-[#52525B]"
        />
        <Card.Content
          text={instrument.totalAmount}
          className={index === 0 ? 'text-5xl' : 'text-3xl'}
        />
      </Card.Root>
    ))
  )
