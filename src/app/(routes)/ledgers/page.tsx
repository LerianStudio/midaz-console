'use client'

import LedgersView from '@/app/(routes)/ledgers/ledgers-view'
import { useListLedgers } from '@/client/ledgers'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'

const Page = () => {
  const { currentOrganization } = useOrganization()
  const intl = useIntl()
  const router = useRouter()

  if (!currentOrganization) {
    return (
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
    )
  }

  const {
    data: ledgers,
    refetch,
    isLoading
  } = useListLedgers({
    organizationId: currentOrganization.id!
  })

  return (
    <LedgersView ledgers={ledgers} refetch={refetch} isLoading={isLoading} />
  )
}

export default Page
