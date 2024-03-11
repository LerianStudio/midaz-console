import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { LogoutLink } from '../pkg'
import { ExternalLink, LogOut, Settings } from 'lucide-react'
import GitHubIcon from '../../public/images/github-icon.svg'
import FloaterIcon from '../../public/images/floater-icon.svg'
import BrazilFlag from '../../public/images/brazil-flag.png'
import USAFlag from '../../public/images/usa-flag.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  useTranslation,
  LanguageSwitcher,
  LinkWithLocale
} from 'next-export-i18n'

interface MenuItem {
  type: 'item'
  label: string
  href: string
  icon?: ReactElement
  isBold?: boolean
  isDisabled?: boolean
  fontSizeBase?: boolean
}

interface MenuGroup {
  type: 'group'
  items: MenuItem[]
}

interface MenuAction {
  type: 'action'
  label: string
  action: () => void
  icon?: ReactElement
  isBold?: boolean
  isDisabled?: boolean
  fontSizeBase?: boolean
}

type MenuEntry = MenuItem | MenuGroup | MenuAction

export const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const onLogout = LogoutLink()

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const menuItems: MenuEntry[] = [
    {
      type: 'item',
      label: '...',
      href: '/',
      isBold: true,
      fontSizeBase: true
    },
    {
      type: 'group',
      items: [
        {
          type: 'item',
          label: t('popoverHeader.settings'),
          href: '/',
          icon: <Settings size={15} />
        },
        {
          type: 'item',
          label: 'Github',
          href: '/',
          icon: <Image src={GitHubIcon} height={15} width={15} alt="" />
        },
        {
          type: 'item',
          label: t('popoverHeader.support'),
          href: '/',
          icon: <Image src={FloaterIcon} height={15} width={15} alt="" />
        },
        {
          type: 'item',
          label: 'API Docs',
          href: '/',
          icon: <ExternalLink size={15} />,
          isDisabled: true
        }
      ]
    },
    {
      type: 'item',
      label: 'CLI Docs',
      href: '/',
      icon: <ExternalLink size={15} />,
      isDisabled: true
    },
    {
      type: 'action',
      label: t('popoverHeader.logout'),
      action: onLogout,
      icon: <LogOut size={15} />
    }
  ]

  const renderItem = (item: MenuItem, index: number) => (
    <Link key={index} href={item.href} className="flex w-full items-center">
      <Button
        variant="ghost"
        onClick={() => setOpen(false)}
        className="flex w-full items-center justify-start"
        disabled={item.isDisabled}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span
          className={cn('text-sm', {
            'text-base': item.fontSizeBase,
            'font-bold': item.isBold
          })}
        >
          {item.label}
        </span>
      </Button>
    </Link>
  )

  const renderGroup = (group: MenuGroup, index: number) => (
    <div key={index} className="flex w-full flex-col">
      {group.items.map((item, itemIndex) => renderItem(item, itemIndex))}
    </div>
  )

  const renderAction = (action: MenuAction, index: number) => (
    <div key={index} className="flex w-full items-center">
      <Button
        variant="ghost"
        onClick={() => {
          setOpen(false)
          action.action()
        }}
        className="flex w-full items-center justify-start"
      >
        {action.icon && <span className="mr-2">{action.icon}</span>}
        {action.label}
      </Button>
    </div>
  )

  const renderWithBorder = (
    content: JSX.Element,
    index: number,
    array: MenuEntry[]
  ) => (
    <div
      key={index}
      className={`w-full ${index < array.length - 1 ? 'border-b' : ''}`}
    >
      {content}
    </div>
  )

  return (
    <div className="flex h-14 w-full items-center justify-end gap-5 border-b bg-[#F9DF4B] p-5">
      <nav className="flex w-full items-center justify-end gap-3">
        <LanguageSwitcher lang="pt">
          <Image width={32} height={32} alt="Brazil flag" src={BrazilFlag} />
        </LanguageSwitcher>
        <LanguageSwitcher lang="en">
          <Image width={32} height={32} alt="USA flag" src={USAFlag} />
        </LanguageSwitcher>
        {/* <ToggleMode /> */}
      </nav>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex w-full min-w-[213px] flex-col items-start rounded-lg p-0">
          {menuItems.map((item, index, array) => {
            if (item.type === 'group') {
              return renderWithBorder(renderGroup(item, index), index, array)
            } else if (item.type === 'action') {
              return renderWithBorder(renderAction(item, index), index, array)
            } else {
              return renderWithBorder(
                renderItem(item as MenuItem, index),
                index,
                array
              )
            }
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}
