'use client'

import { useState } from 'react'
import SettingsDialog from '../settings-dialog'
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
import { Book, CircleUser, LifeBuoy, LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const UserDropdown = () => {
  const intl = useIntl()
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUser className="h-8 w-8 text-shadcn-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[241px]">
          <DropdownMenuLabel>
            {intl.formatMessage({
              id: 'common.user',
              defaultMessage: 'User'
            })}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <User />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.profile',
              defaultMessage: 'My Profile'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <Book />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'header.userDropdown.documentation',
              defaultMessage: 'Documentation Hub'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-10">
            {intl.formatMessage({
              id: 'header.userDropdown.support',
              defaultMessage: 'Support'
            })}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/signin' })}>
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
