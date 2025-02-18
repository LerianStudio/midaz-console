'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'
import { Building, HelpCircle, Settings, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Button } from '../ui/button'
import midazLogo from '@/svg/brand-midaz.svg'

export const SettingsDropdown = () => {
  const intl = useIntl()
  const router = useRouter()
  const [aboutOpen, setAboutOpen] = useState(false)

  const termsLink = ''
  const licenseLink = ''

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Settings className="text-shadcn-400" size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[241px]">
          <DropdownMenuLabel>
            {intl.formatMessage({
              id: 'settingsDropdown.settings',
              defaultMessage: 'Settings'
            })}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <DropdownMenuItemIcon>
              <Building />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'settingsDropdown.organizations',
              defaultMessage: 'Organizations'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuItemIcon>
              <Users />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'settingsDropdown.users',
              defaultMessage: 'Users'
            })}
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-10">
            {intl.formatMessage({
              id: 'settingsDropdown.system',
              defaultMessage: 'System'
            })}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAboutOpen(true)}>
            <DropdownMenuItemIcon>
              <HelpCircle />
            </DropdownMenuItemIcon>
            {intl.formatMessage({
              id: 'settingsDropdown.about.midaz',
              defaultMessage: 'About Midaz'
            })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent
          className="w-fit justify-center gap-6 sm:max-w-[425px] [&>button]:hidden"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogHeader className="flex flex-col items-center">
            <Image src={midazLogo} alt="Midaz Logo" width={112} height={112} />
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-lg font-bold text-zinc-900 sm:text-center">
                Midaz Console
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2 text-zinc-500 sm:text-center">
                <span>
                  {intl.formatMessage(
                    {
                      id: 'dialog.about.midaz.version',
                      defaultMessage: 'Version {version}'
                    },
                    { version: '0.1' }
                  )}
                </span>
                <span>Build 947</span>
              </DialogDescription>
            </div>

            {false && (
              <DialogDescription className="flex justify-center gap-4 text-zinc-800">
                <Button variant="link" className="h-fit p-0" asChild>
                  <a href={termsLink} target="_blank" rel="noopener noreferrer">
                    {intl.formatMessage({
                      id: 'dialog.about.midaz.terms',
                      defaultMessage: 'Terms of Use'
                    })}
                  </a>
                </Button>
                <Button variant="link" className="h-fit p-0" asChild>
                  <a
                    href={licenseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({
                      id: 'dialog.about.midaz.license',
                      defaultMessage: 'License'
                    })}
                  </a>
                </Button>
              </DialogDescription>
            )}

            <DialogDescription className="flex text-zinc-500 sm:text-center">
              {intl.formatMessage(
                {
                  id: 'dialog.about.midaz.copyright',
                  defaultMessage:
                    'Copyright © Lerian {year} - All rights reserved.'
                },
                { year: new Date().getFullYear() }
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex sm:justify-center">
            <Button onClick={() => setAboutOpen(false)} variant="outline">
              {intl.formatMessage({
                id: 'common.close',
                defaultMessage: 'Close'
              })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
