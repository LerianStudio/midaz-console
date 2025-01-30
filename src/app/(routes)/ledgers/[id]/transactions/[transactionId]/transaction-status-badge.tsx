import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckCheckIcon, X } from 'lucide-react'
import { useIntl } from 'react-intl'

type TransactionStatus = 'APPROVED' | 'CANCELLED'

interface TransactionStatusBadgeProps {
  status: TransactionStatus
  className?: string
}

export function TransactionStatusBadge({
  status,
  className
}: TransactionStatusBadgeProps) {
  const intl = useIntl()
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500">{intl.formatMessage({
          id: 'transactions.status.title',
          defaultMessage: 'Transaction Status'
        })}</span>
      {status === 'APPROVED' ? (
        <Badge
          className={cn(
            'bg-[#16A34A] text-white hover:bg-emerald-600',
            'flex items-center gap-2 px-4 py-1.5',
            'font-medium',
            className
          )}
        >
          {intl.formatMessage({
            id: 'transactions.status.approved',
            defaultMessage: 'Approved'
          })}
          <CheckCheckIcon className="h-4 w-4" />
        </Badge>
      ) : (
        

        <Badge
        className={cn(
        'bg-gray-100 border-gray-400 text-gray-700',
          'flex items-center gap-2 px-4 py-1.5',
          'font-medium',
          className
        )}
        >
        {intl.formatMessage({
          id: 'transactions.status.canceled',
          defaultMessage: 'Canceled'
        })}
        <X className="h-4 w-4" />
        </Badge>


      )}
    </div>
  )
}
