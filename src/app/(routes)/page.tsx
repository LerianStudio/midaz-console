'use client'

import { useListOrganizations } from '@/client/organizations'
import { PageHeader } from '@/components/page-header'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React from 'react'
import Image from 'next/image'
import Rocket from '@/animations/rocket.gif'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Page = () => {
  const intl = useIntl()
  const router = useRouter()
  const { data: session } = useSession()
  const { data, isLoading } = useListOrganizations({})
  const [dialogOpen, setDialogOpen] = React.useState(true)
  const hasOrganizations = data?.items.length! > 0

  if (isLoading) {
    return null
  }

  return (
    <React.Fragment>
      {!hasOrganizations && dialogOpen && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent
            className="w-full max-w-[544px] p-12 sm:min-w-[544px]"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <DialogHeader className="my-8">
              <div className="flex flex-row justify-between gap-12 pr-12">
                <DialogTitle className="text-3xl font-bold text-zinc-600">
                  {intl.formatMessage({
                    id: 'homePage.greetings.title',
                    defaultMessage: 'Greetings,'
                  })}
                  <br />
                  {session?.user.name}!
                </DialogTitle>
                <Image src={Rocket} alt="Rocket" height={72} width={72} />
              </div>

              <DialogDescription className="space-y-7">
                <p className="text-sm font-medium text-zinc-600">
                  {intl.formatMessage({
                    id: 'homePage.dialog.description.part1',
                    defaultMessage:
                      'Your Midaz Console is now active and operational.'
                  })}
                </p>
                <p className="text-sm font-medium text-zinc-600">
                  <FormattedMessage
                    id="homePage.dialog.description.part2"
                    defaultMessage="However, to advance on the journey, you need to create an {organization}, where your ledger and all your information will be stored."
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

            <DialogFooter className="flex w-full sm:justify-between">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setDialogOpen(false)}
              >
                {intl.formatMessage({
                  id: 'homePage.dialog.footer.laterButton',
                  defaultMessage: 'Maybe later'
                })}
              </Button>

              <Button
                type="button"
                size="lg"
                icon={<ArrowRight size={16} />}
                className="px-3"
                onClick={() => router.push('/settings')}
              >
                {intl.formatMessage({
                  id: 'homePage.dialog.footer.createOrganizationButton',
                  defaultMessage: 'Create organization'
                })}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!hasOrganizations && !dialogOpen && (
        <div className="mt-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle>
                {intl.formatMessage({
                  id: 'homePage.alert.title',
                  defaultMessage: 'Attention'
                })}
              </AlertTitle>
              <AlertDescription>
                {intl.formatMessage({
                  id: 'homePage.alert.description',
                  defaultMessage:
                    "You don't have an organization, please create one."
                })}
              </AlertDescription>
              <Button
                variant="outline"
                onClick={() => router.push('/settings')}
                className="mt-4"
              >
                {intl.formatMessage({
                  id: 'homePage.dialog.footer.createOrganizationButton',
                  defaultMessage: 'Create Organization'
                })}
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {hasOrganizations && (
        <PageHeader.Root>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'homePage.welcomeBack.title',
              defaultMessage: 'Welcome again!'
            })}
          />
        </PageHeader.Root>
      )}
    </React.Fragment>
  )
}

export default Page
