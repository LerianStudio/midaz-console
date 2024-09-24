'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar/avatar'
import SettingsDialog from '../settings-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { useIntl } from 'react-intl'
import { cn } from '@/lib/utils'
import {
  CreditCard,
  ExternalLink,
  Github,
  LifeBuoy,
  LogOut,
  User
} from 'lucide-react'

export const UserDropdown = () => {
  const intl = useIntl()
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-[60px] items-center justify-center outline-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('rounded-lg', 'min-w-[241px]')}>
          <div className="flex items-center gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-shadcn-100">
            <DropdownMenuLabel className="p-0 text-sm font-bold text-[#52525b]">
              Rick Morty
            </DropdownMenuLabel>
          </div>
          <DropdownMenuSeparator className="bg-shadcn-200" />
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">{<User size={16} />}</span>
            <p className="text-sm font-medium text-[#52525b]">
              {intl.formatMessage({
                id: 'header.userDropdown.profile',
                defaultMessage: 'Profile'
              })}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">{<CreditCard size={16} />}</span>
            <p className="text-sm font-medium text-[#52525b]">
              {intl.formatMessage({
                id: 'header.userDropdown.subscription',
                defaultMessage: 'Subscription'
              })}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">{<Github size={16} />}</span>
            <p className="text-sm font-medium text-[#52525b]">Github</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">
              {<ExternalLink size={16} />}
            </span>
            <p className="text-sm font-medium text-[#52525b]">Docs</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">
              {<ExternalLink size={16} />}
            </span>
            <p className="text-sm font-medium text-[#52525b]">CLI Docs</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">{<LifeBuoy size={16} />}</span>
            <p className="text-sm font-medium text-[#52525b]">
              {intl.formatMessage({
                id: 'header.userDropdown.support',
                defaultMessage: 'Support'
              })}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
            <span className="text-shadcn-400">{<LogOut size={16} />}</span>
            <p className="text-sm font-medium text-[#52525b]">
              {intl.formatMessage({
                id: 'header.userDropdown.logout',
                defaultMessage: 'Logout'
              })}
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
