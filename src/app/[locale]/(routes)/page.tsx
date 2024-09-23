'use client'

import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()

  return (
    <PageHeader.Root>
      <PageHeader.InfoTitle
        title={intl.formatMessage({
          id: 'auth.titleLogin',
          defaultMessage: 'Welcome again!'
        })}
      />
    </PageHeader.Root>
  )
}

export default Page
