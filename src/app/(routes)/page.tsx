'use client'

import { useListOrganizations } from '@/client/organizations'
import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'
import React from 'react'
import { useSession } from 'next-auth/react'

const Page = () => {
  const intl = useIntl()
  const { data: session } = useSession()
  const { data, isLoading } = useListOrganizations({})
  const hasOrganizations = data?.items.length! > 0

  if (isLoading) {
    return null
  }

  return (
    <React.Fragment>
      {hasOrganizations && (
        <PageHeader.Root>
          <PageHeader.InfoTitle
            title={intl.formatMessage(
              {
                id: 'homePage.welcome.title',
                defaultMessage: 'Welcome, {user}!'
              },
              {
                user: (session?.user?.name as string) || 'Guest'
              }
            )}
          />
        </PageHeader.Root>
      )}
    </React.Fragment>
  )
}

export default Page
