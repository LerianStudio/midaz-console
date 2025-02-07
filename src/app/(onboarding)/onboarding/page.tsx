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
import { useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const router = useRouter()
  const { data } = useListOrganizations({})

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className="[data-radix-dialog-close] w-full max-w-[640px] p-12 sm:min-w-[640px]"
      >
        <DialogHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-8">
              <p className="text-base font-medium text-zinc-600">
                {intl.formatMessage({
                  id: 'onboarding.dialog.firstSteps',
                  defaultMessage: 'First steps'
                })}
              </p>
              <DialogTitle className="text-4xl font-bold text-zinc-600">
                {intl.formatMessage({
                  id: 'onboarding.dialog.title',
                  defaultMessage: 'Launch the Midaz Console'
                })}
              </DialogTitle>
            </div>
            <div className="flex items-center px-12">
              <div className="shrink-0">
                <Image src={Rocket} alt="Rocket" height={64} width={64} />
              </div>
            </div>
          </div>

          <DialogDescription className="space-y-7 text-sm font-medium text-zinc-400">
            {intl.formatMessage({
              id: 'onboarding.dialog.description',
              defaultMessage: `Complete your Organization's registration and create the first Ledger to activate the powerful features of the Midaz Console.`
            })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3 flex w-full sm:justify-end">
          <Button
            type="button"
            size="default"
            onClick={() => router.push('/settings')}
          >
            {intl.formatMessage({
              id: 'onboarding.dialog.button',
              defaultMessage: "Let's go"
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Page
