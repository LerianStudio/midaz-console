import { DialogDescription as BaseDialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DialogDescriptionProps = {
  subtitle: string
  ledgerName: string
  className?: string
}

const DialogDescription = ({
  subtitle,
  ledgerName,
  className
}: DialogDescriptionProps) => {
  return (
    <BaseDialogDescription className={cn('text-xs font-medium', className)}>
      <span>{subtitle}</span>
      <span className="font-bold"> {ledgerName}</span>
    </BaseDialogDescription>
  )
}

export default DialogDescription
