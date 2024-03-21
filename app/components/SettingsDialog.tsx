import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AvatarInputFile } from './AvatarInputFile'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SettingsDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-full max-w-[384px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-lg font-bold">Configurações</h1>
          </DialogTitle>
          <DialogDescription>
            <p className="text-xs font-medium">
              Faça as alterações desejadas e clique em “Salvar” quando
              finalizar.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AvatarInputFile />
          <div className="mt-4 grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right font-semibold">
              Nome
            </Label>
            <Input
              id="name"
              defaultValue="Gabriel Sanchez"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right font-semibold">
              E-mail
            </Label>
            <Input
              id="username"
              defaultValue="gabriel.sanchez@leriand.com"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-[#F9DF4B] text-black hover:bg-[#F9DF4B]/70"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
