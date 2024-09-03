import { DialogTitle as BaseDialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DialogTitleProps = {
  title: string
  className?: string
}

const DialogTitle = ({ title, className }: DialogTitleProps) => {
  return (
    <BaseDialogTitle className={cn('text-lg font-bold', className)}>
      {title}
    </BaseDialogTitle>
  )
}

export default DialogTitle
