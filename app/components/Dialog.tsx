import { Button } from '@/components/ui/button/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type Props = {
  title: string
  subtitle: string
  deleteButtonText: string
  doingBusinessAs?: string | undefined
  ledgerName?: string | undefined
  open: boolean
  setOpen: (open: boolean) => void
  onDelete: () => void
}

export const DialogDemo = ({
  title,
  subtitle,
  doingBusinessAs,
  open,
  setOpen,
  onDelete,
  deleteButtonText,
  ledgerName
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-xs font-medium">
            {subtitle}{' '}
            <span className="font-bold">{doingBusinessAs || ledgerName}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            autoFocus={false}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="bg-lemon-400 hover:bg-lemon-400/70 text-black"
          >
            {deleteButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
