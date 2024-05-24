'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar/avatar'
import Dropdown from '../Dropdown'
import SettingsDialog from '../SettingsDialog'
import { getUserMenuItems } from './menuItems'

export const UserDropdown = () => {
  const t = useTranslations('header')
  const [openSettings, setOpenSettings] = useState(false)
  const userMenuItems = getUserMenuItems(t)

  const trigger = (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )

  return (
    <div>
      <Dropdown
        trigger={trigger}
        menuItems={userMenuItems}
        menuLabel="Rick Morty"
      />

      <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
    </div>
  )
}
