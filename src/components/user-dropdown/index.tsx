'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar/avatar'
import SettingsDialog from '../settings-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu/dropdown-menu'
import { useIntl } from 'react-intl'
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
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[241px]">
          <DropdownMenuLabel>Rick Morty</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <User />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.profile',
              defaultMessage: 'Profile'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <CreditCard />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.subscription',
              defaultMessage: 'Subscription'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <Github />
            </DropdownMenuItemIcon>
            Github
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <ExternalLink />
            </DropdownMenuItemIcon>
            Docs
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <ExternalLink />
            </DropdownMenuItemIcon>
            CLI Docs
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <LifeBuoy />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.support',
              defaultMessage: 'Support'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <LogOut />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.logout',
              defaultMessage: 'Logout'
            })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
