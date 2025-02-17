'use client'

import { SettingsDropdown } from './settings-dropdown'
import { UserDropdown } from './user-dropdown'
import { Separator } from './ui/separator'
import { useIntl } from 'react-intl'
import { LedgerSelector } from './ledger-selector'

export const Header = () => {
  const intl = useIntl()

  return (
    <div className="flex h-[60px] w-full items-center border-b bg-white py-5 pr-16">
      <nav className="flex w-full items-center justify-between gap-4 pl-16">
        <LedgerSelector />

        <div className="flex items-center gap-6">
          <p className="text-xs font-medium text-zinc-400">
            Midaz Console{' '}
            <span className="text-xs font-normal text-zinc-400">v.0.1</span>
          </p>

          <Separator orientation="vertical" className="h-10" />

          <p className="text-xs font-normal text-zinc-400">
            {intl.locale.toLocaleUpperCase()}
          </p>

          <SettingsDropdown />
          <UserDropdown />
        </div>
      </nav>
    </div>
  )
}
