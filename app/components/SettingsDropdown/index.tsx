import { Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Dropdown from '../Dropdown'
import { getSettingsMenuItems } from './menuItems'

export const SettingsDropdown = () => {
  const t = useTranslations('header')
  const userMenuItems = getSettingsMenuItems(t)

  const trigger = <Settings className="text-shadcn-400" size={24} />

  return (
    <Dropdown
      trigger={trigger}
      menuItems={userMenuItems}
      menuLabel={t('settingsDropdown.settings')}
      menuIcon={<Settings className="text-shadcn-400" size={16} />}
    />
  )
}
