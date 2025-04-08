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
import { Book, CircleUser, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { UserSheet } from './user-sheet'
import { useCreateUpdateSheet } from '../sheet/use-create-update-sheet'
import { useUserById } from '@/client/users'
export const UserDropdown = () => {
  const intl = useIntl()
  const { data: session } = useSession()
  const { handleCreate, handleEdit, sheetProps } = useCreateUpdateSheet<any>({
    enableRouting: true
  })
  const [openSettings, setOpenSettings] = useState(false)

  const { data: user } = useUserById({
    userId: session?.user?.id
  })

  console.log('user', user)

  const handleOpenUserSheet = () => {
    handleEdit(user)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUser className="h-8 w-8 text-shadcn-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[241px]">
          <DropdownMenuLabel>
            {session?.user?.name ||
              intl.formatMessage({
                id: 'common.user',
                defaultMessage: 'User'
              })}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleOpenUserSheet}>
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

      <UserSheet {...sheetProps} />
      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
