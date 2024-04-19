'use client'

import { ExternalLink, Github, LifeBuoy, LogOut, User } from 'lucide-react'
import { MenuEntry } from './Header'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import SettingsDialog from './SettingsDialog'

export const UserDropdown = () => {
  const t = useTranslations('header')
  const [openSettings, setOpenSettings] = useState(false)

  const menuItems: MenuEntry[] = [
    { type: 'separator' },
    {
      type: 'action',
      label: t('userDropdown.profile'),
      action: () => setOpenSettings(true),
      icon: <User size={16} />
    },
    { type: 'separator' },
    {
      type: 'action',
      label: 'Github',
      action: () => {},
      icon: <Github size={16} />
    },
    {
      type: 'action',
      label: t('userDropdown.support'),
      action: () => {},
      icon: <LifeBuoy size={16} />
    },
    {
      type: 'action',
      label: 'Docs',
      action: () => {},
      icon: <ExternalLink size={16} />
    },
    {
      type: 'action',
      label: 'CLI Docs',
      action: () => {},
      icon: <ExternalLink size={16} />
    },
    { type: 'separator' },
    {
      type: 'action',
      label: t('userDropdown.logout'),
      action: () => {},
      icon: <LogOut size={16} />
    }
  ]

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex outline-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[241px] rounded-lg">
          <DropdownMenuLabel className="text-sm font-bold text-[#52525b]">
            Rick Morty
          </DropdownMenuLabel>
          {menuItems.map((item, index) => {
            if (item.type === 'action') {
              return (
                <DropdownMenuItem
                  key={index}
                  onSelect={item.action}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <span className="text-shadcn-400">{item.icon}</span>
                  <p className="text-sm font-medium text-[#52525b]">
                    {item.label}
                  </p>
                </DropdownMenuItem>
              )
            }

            if (item.type === 'separator') {
              return (
                <DropdownMenuSeparator
                  key={`separator-${index}`}
                  className="bg-shadcn-200"
                />
              )
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
