import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpRight } from 'lucide-react'

export const TransactionCard = ({
  isLoading,
  count
}: {
  isLoading: boolean
  count: number
}) =>
  isLoading ? (
    <Skeleton className="h-[134px] bg-zinc-200" />
  ) : (
    <Card.Root className="bg-[#3F3F46]">
      <Card.Header
        title="# Transações / 24h"
        icon={ArrowUpRight}
        className="text-shadcn-200"
        iconClassName="text-shadcn-200"
      />
      <Card.Content text={count} className="text-5xl text-white" />
    </Card.Root>
  )
