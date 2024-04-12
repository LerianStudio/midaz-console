import { Button } from '@/components/ui/button/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { AvatarInputFile } from './AvatarInputFile'
import { useTranslations } from 'next-intl'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SettingsDialog = ({ open, setOpen }: Props) => {
  const t = useTranslations('settingsDialog')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-full max-w-[384px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{t('title')}</DialogTitle>
          <DialogDescription className="text-xs font-medium">
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AvatarInputFile />
          <div className="mt-4 grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right font-semibold">
              {t('label.name')}
            </Label>
            <Input
              id="name"
              defaultValue="Gabriel Sanchez"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right font-semibold">
              {t('label.email')}
            </Label>
            <Input
              id="username"
              defaultValue="gabriel.sanchez@leriand.com"
              className="col-span-4"
              readOnly={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-sunglow-300 text-black hover:bg-sunglow-300/70"
          >
            {t('btnText')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
