'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from './ui/button'
import { LanguageSwitcher, LinkWithLocale } from 'next-export-i18n'

export const Header = () => {
  return (
    <div className="flex h-16 w-full items-center justify-end gap-5 border-b bg-gray-100 p-5">
      <nav>
        <LanguageSwitcher lang="pt_BR">Português Brasileiro</LanguageSwitcher>
        <LanguageSwitcher lang="en">English</LanguageSwitcher>
      </nav>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex w-full flex-col items-start p-1">
          <LinkWithLocale href="/organizations">
            <Button variant="ghost">My organization</Button>
          </LinkWithLocale>
          <Button variant="ghost" className="flex w-full justify-start">
            Sign out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
