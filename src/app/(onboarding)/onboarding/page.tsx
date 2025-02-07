'use client'

import { useListOrganizations } from '@/client/organizations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Rocket from '@/animations/rocket.gif'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const router = useRouter()
  const { data } = useListOrganizations({})
  const [dialogOpen, setDialogOpen] = React.useState(true)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent
        showCloseButton={false}
        className="[data-radix-dialog-close] w-full max-w-[544px] p-12 sm:min-w-[544px]"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <p className="text-base font-medium text-zinc-600">
            {intl.formatMessage({
              id: 'homePage.dialog.onboarding.gettingStarted',
              defaultMessage: 'Getting started'
            })}
          </p>

          <div className="flex flex-row justify-between gap-12 pr-12">
            <DialogTitle className="text-4xl font-bold text-zinc-600">
              {intl.formatMessage({
                id: 'homePage.dialog.onboarding.title',
                defaultMessage: 'Launch the Midaz Console'
              })}
            </DialogTitle>

            <div className="shrink-0">
              <Image src={Rocket} alt="Rocket" height={64} width={64} />
            </div>
          </div>

          <DialogDescription className="space-y-7">
            <p className="text-sm font-medium text-zinc-400">
              <FormattedMessage
                id="homePage.dialog.onboarding.description"
                defaultMessage="Complete your Organization's registration and create the first Ledger to activate the powerful features of the Midaz Console."
                values={{
                  organization: (
                    <span className="font-bold">
                      <FormattedMessage
                        id="organization"
                        defaultMessage="Organization"
                      />
                    </span>
                  )
                }}
              />
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3 flex w-full sm:justify-end">
          <Button
            type="button"
            size="default"
            onClick={() => router.push('/settings')}
          >
            {intl.formatMessage({
              id: 'homePage.dialog.startOnboarding.button',
              defaultMessage: "Let's go"
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Page
