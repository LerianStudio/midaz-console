'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from './ui/button'
import {
  useTranslation,
  LanguageSwitcher,
  LinkWithLocale
} from 'next-export-i18n'
import Image from 'next/image'
import BrazilFlag from '../../public/images/brazil-flag.png'
import USAFlag from '../../public/images/usa-flag.png'
import { ToggleMode } from './ui/toggleMode'
import { useState } from 'react'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div className="flex h-16 w-full items-center justify-end gap-5 border-b bg-background p-5">
      <nav className="flex w-full items-center justify-end gap-3">
        <LanguageSwitcher lang="pt_BR">
          <Image width={32} height={32} alt="Brazil flag" src={BrazilFlag} />
        </LanguageSwitcher>
        <LanguageSwitcher lang="en">
          <Image width={32} height={32} alt="USA flag" src={USAFlag} />
        </LanguageSwitcher>
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
          <LinkWithLocale href="/organizations">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t('popoverHeader.myOrganization')}
            </Button>
          </LinkWithLocale>
          <Button
            variant="ghost"
            className="flex w-full justify-start"
            onClick={() => setOpen(false)}
          >
            {t('popoverHeader.signOut')}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
