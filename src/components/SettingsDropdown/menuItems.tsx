import { Building, Code, Languages, Shield } from 'lucide-react'

export const getSettingsMenuItems = (t: any) => {
  return [
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
}
