'use client'

import { SettingsDropdown } from './settings-dropdown'
import { UserDropdown } from './user-dropdown'
import { Separator } from './ui/separator'
import { useIntl } from 'react-intl'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Book } from 'lucide-react'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListLedgers } from '@/client/ledgers'

export const Header = () => {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()

  const { data: ledgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  return (
    <div className="flex h-[60px] w-full items-center border-b bg-white py-5 pr-16">
      <nav className="flex w-full items-center justify-between gap-4 pl-16">
        <Select>
          <SelectTrigger className="w-fit text-sm font-semibold text-zinc-800">
            <div className="flex items-center gap-4">
              <Book size={20} className="text-zinc-400" />
              <span className="pt-[2px] text-xs font-normal uppercase text-zinc-400">
                {intl.formatMessage({
                  id: 'ledger.selector.label',
                  defaultMessage: 'Current Ledger'
                })}
              </span>
              <SelectValue placeholder="Select a ledger" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs font-medium uppercase text-zinc-400">
                {intl.formatMessage({
                  id: 'ledgers.title',
                  defaultMessage: 'Ledgers'
                })}
              </SelectLabel>
              {ledgers?.items?.map((ledger: any) => (
                <SelectItem key={ledger.id} value={ledger.id}>
                  {ledger.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-6">
          <p className="text-xs font-medium text-zinc-400">
            Midaz Console v.0.1
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
