import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../components/ui/popover'
import { Button } from './ui/button'
import Image from 'next/image'
import BrazilFlag from '../../public/images/brazil-flag.png'
import USAFlag from '../../public/images/usa-flag.png'
import { ToggleMode } from './ui/toggleMode'
import { useState } from 'react'
import Link from 'next/link'
import { LogoutLink } from '../pkg'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const onLogout = LogoutLink()

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div className="flex h-16 w-full items-center justify-end gap-5 border-b bg-background p-5">
      <nav className="flex w-full items-center justify-end gap-3">
        <Image width={32} height={32} alt="Brazil flag" src={BrazilFlag} />
        <Image width={32} height={32} alt="USA flag" src={USAFlag} />
        <ToggleMode />
      </nav>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex w-full flex-col items-start p-1">
          <Link href="/organizations">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {/* {t('popoverHeader.myOrganization')} */}
              Minha organização
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex w-full justify-start"
            onClick={onLogout}
          >
            Sair
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
