'use client'

import { Building, Code, Languages, Settings, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/navigation'

export const SettingsDropdown = () => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="text-shadcn-400" size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[241px]">
        <DropdownMenuLabel>
          {intl.formatMessage({
            id: 'settingsDropdown.settings',
            defaultMessage: 'Settings'
          })}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <DropdownMenuItemIcon>
            <Building />
          </DropdownMenuItemIcon>
          {intl.formatMessage({
            id: 'settingsDropdown.organizations',
            defaultMessage: 'Organizations'
          })}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Code />
          </DropdownMenuItemIcon>
          {intl.formatMessage({
            id: 'settingsDropdown.system',
            defaultMessage: 'System'
          })}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Shield />
          </DropdownMenuItemIcon>
          {intl.formatMessage({
            id: 'settingsDropdown.security',
            defaultMessage: 'Security'
          })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
