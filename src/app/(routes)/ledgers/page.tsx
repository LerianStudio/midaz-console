'use client'

import LedgersView from '@/app/(routes)/ledgers/ledgers-view'
import { useListLedgers } from '@/client/ledgers'
import { useListOrganizations } from '@/client/organizations'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { AlertCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl'

const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1

const Page = () => {
  const intl = useIntl()
  const router = useRouter()
  const searchParams = useSearchParams()
  const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT
  const page = Number(searchParams.get('page')) || DEFAULT_PAGE
  const { currentOrganization, setOrganization } = useOrganization()
  const { data: organizations } = useListOrganizations({})

  React.useEffect(() => {
    if (!currentOrganization && organizations?.items?.length! > 0) {
      setOrganization(organizations!.items[0])
    }
  }, [currentOrganization, organizations, setOrganization])

  const {
    data: ledgers,
    refetch,
    isLoading
  } = useListLedgers({
    organizationId: currentOrganization?.id!,
    enabled: !!currentOrganization,
    limit,
    page
  })

  if (!currentOrganization) {
    return (
      <div className="mt-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <div>
            <AlertTitle>
              {intl.formatMessage({
                id: 'ledgersPage.alert.title',
                defaultMessage: 'Organization Required'
              })}
            </AlertTitle>
            <AlertDescription>
              {intl.formatMessage({
                id: 'ledgersPage.alert.description',
                defaultMessage:
                  'To use ledger features, you need to create an organization.'
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

  return (
    <LedgersView
      ledgers={ledgers}
      refetch={refetch}
      isLoading={isLoading}
      defaultPageSize={limit}
      defaultPage={page}
    />
  )
}

export default Page
