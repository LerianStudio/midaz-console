import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckCheckIcon, ClockIcon } from 'lucide-react'

type TransactionStatus = 'APPROVED' | 'PENDING'

interface TransactionStatusBadgeProps {
  status: TransactionStatus
  className?: string
}

export function TransactionStatusBadge({
  status,
  className
}: TransactionStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500">Status da Transação</span>
      {status === 'APPROVED' ? (
        <Badge
          className={cn(
            'bg-emerald-500 text-white hover:bg-emerald-400',
            'flex items-center gap-2 px-4 py-1.5',
            'font-medium',
            className
          )}
        >
          Aprovada
          <CheckCheckIcon className="h-4 w-4" />
        </Badge>
      ) : (
        <Badge
          className={cn(
            'bg-gray-100 text-gray-700',
            'flex items-center gap-1.5 px-3 py-0.5',
            'font-medium',
            className
          )}
        >
          Pendente
          <ClockIcon className="h-4 w-4" />
        </Badge>
      )}
    </div>
  )
}
