import { DialogContent as BaseDialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DialogContentProps = {
  children: React.ReactNode
  className?: string
}

const DialogContent = ({ children, className }: DialogContentProps) => {
  return (
    <BaseDialogContent
      className={cn('sm:max-w-[425px]', className)}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      {children}
    </BaseDialogContent>
  )
}

export default DialogContent
