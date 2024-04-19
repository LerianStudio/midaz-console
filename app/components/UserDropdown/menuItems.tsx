import { ExternalLink, Github, LifeBuoy, LogOut, User } from 'lucide-react'

export const getUserMenuItems = (t: any) => {
  return [
    { type: 'separator' },
    {
      type: 'action',
      label: t('userDropdown.profile'),
      action: () => {},
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
}
