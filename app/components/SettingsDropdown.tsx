import { Building, Code, Languages, Settings, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { MenuEntry } from './Header'
import { useTranslations } from 'next-intl'

export const SettingsDropdown = () => {
  const t = useTranslations('header')

  const menuItemsConfig: MenuEntry[] = [
    { type: 'separator' },
    {
      type: 'action',
      label: t('settingsDropdown.organizations'),
      action: () => {},
      icon: <Building size={16} />
    },
    {
      type: 'action',
      label: t('settingsDropdown.system'),
      action: () => {},
      icon: <Code size={16} />
    },
    {
      type: 'action',
      label: t('settingsDropdown.security'),
      action: () => {},
      icon: <Shield size={16} />
    },
    {
      type: 'action',
      label: t('settingsDropdown.language'),
      action: () => {},
      icon: <Languages size={16} />
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center outline-none">
        <Settings className="text-shadcn-400" size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[241px] rounded-lg">
        <div className="flex items-center gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-accent">
          <Settings className="text-shadcn-400" size={16} />
          <DropdownMenuLabel className="p-0 text-sm font-bold text-[#52525b]">
            {t('settingsDropdown.settings')}
          </DropdownMenuLabel>
        </div>
        {menuItemsConfig.map((item, index) => {
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
  )
}
