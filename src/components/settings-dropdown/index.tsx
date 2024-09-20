'use client'

import { Building, Code, Languages, Settings, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useIntl } from 'react-intl'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const SettingsDropdown = () => {
  const intl = useIntl()
  const router = useRouter()

  const handleLanguage = (locale: string) => {
    setCookie('locale', locale)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-[60px] items-center justify-center outline-none">
        <Settings className="text-shadcn-400" size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('rounded-lg', 'min-w-[241px]')}>
        <div className="flex items-center gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-shadcn-100">
          <DropdownMenuLabel className="p-0 text-sm font-bold text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.settings',
              defaultMessage: 'Settings'
            })}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator className="bg-shadcn-200" />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
          <span className="text-shadcn-400">{<Building size={16} />}</span>
          <p className="text-sm font-medium text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.organizations',
              defaultMessage: 'Organizations'
            })}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
          <span className="text-shadcn-400">{<Code size={16} />}</span>
          <p className="text-sm font-medium text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.system',
              defaultMessage: 'System'
            })}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100">
          <span className="text-shadcn-400">{<Shield size={16} />}</span>
          <p className="text-sm font-medium text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.security',
              defaultMessage: 'Security'
            })}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100"
          onClick={() => handleLanguage('en')}
        >
          <span className="text-shadcn-400">{<Languages size={16} />}</span>
          <p className="text-sm font-medium text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.english',
              defaultMessage: 'English'
            })}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100"
          onClick={() => handleLanguage('pt')}
        >
          <span className="text-shadcn-400">{<Languages size={16} />}</span>
          <p className="text-sm font-medium text-[#52525b]">
            {intl.formatMessage({
              id: 'settingsDropdown.portuguese',
              defaultMessage: 'Português'
            })}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
