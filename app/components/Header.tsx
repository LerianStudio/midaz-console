'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar/avatar'
import { useTranslations } from 'next-intl'
import SettingsDialog from '@/components/SettingsDialog'
import { ToggleMode } from '@/components/ui/toggleMode'
import { ReactElement, useState } from 'react'
import { ExternalLink, LogOut, Settings } from 'lucide-react'
import GitHubIcon from '@/components/svgs/gitHubIcon'
import FloaterIcon from '@/components/svgs/floaterIcon'
import LocaleSwitcher from './LocaleSwitcher'

type MenuEntry =
  | { type: 'action'; label: string; action: () => void; icon?: ReactElement }
  | { type: 'separator' }

export const Header = () => {
  const t = useTranslations('popoverHeader')
  const [openSettings, setOpenSettings] = useState(false)

  const menuItems: MenuEntry[] = [
    { type: 'separator' },
    {
      type: 'action',
      label: t('settings'),
      action: () => setOpenSettings(true),
      icon: <Settings size={15} />
    },
    {
      type: 'action',
      label: 'Github',
      action: () => {},
      icon: <GitHubIcon />
    },
    {
      type: 'action',
      label: t('support'),
      action: () => {},
      icon: <FloaterIcon />
    },
    { type: 'separator' },
    {
      type: 'action',
      label: 'API Docs',
      action: () => {},
      icon: <ExternalLink size={15} />
    },
    {
      type: 'action',
      label: 'CLI Docs',
      action: () => {},
      icon: <ExternalLink size={15} />
    },
    { type: 'separator' },
    {
      type: 'action',
      label: t('logout'),
      action: () => {},
      icon: <LogOut size={15} />
    }
  ]

  return (
    <div className="flex h-14 w-full items-center justify-end gap-5 border-b bg-lemon-400 p-5 dark:bg-codGray-950">
      <nav className="flex w-full items-center justify-end gap-3">
        <ToggleMode />
        <LocaleSwitcher />
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>...</DropdownMenuLabel>
          {menuItems.map((item, index) => {
            if (item.type === 'action') {
              return (
                <DropdownMenuItem key={index} onSelect={item.action}>
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </DropdownMenuItem>
              )
            }

            if (item.type === 'separator') {
              return <DropdownMenuSeparator />
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
