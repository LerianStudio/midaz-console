import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckIcon, ClockIcon } from 'lucide-react'

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
            'bg-emerald-100 text-emerald-800', // D1FAE5 e 065F46
            'flex items-center gap-1.5 px-3 py-0.5',
            'font-medium',
            className
          )}
        >
          Aprovada
          <CheckIcon className="h-4 w-4" />
        </Badge>
      ) : (
        <Badge
          className={cn(
            'bg-gray-100 text-gray-700', // F3F4F6 e 1F2937
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
