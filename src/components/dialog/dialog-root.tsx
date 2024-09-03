import { Dialog } from '@/components/ui/dialog'

type DialogRootProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogRoot = ({ children, open, onOpenChange }: DialogRootProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}

export default DialogRoot
