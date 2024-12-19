'use client'

import { Breadcrumb } from '@/components/breadcrumb'
import { TransactionProvider } from './transaction-form-provider'
import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const intl = useIntl()

  return (
    <TransactionProvider>
      <Breadcrumb
        paths={[
          {
            name: intl.formatMessage({
              id: `settings.title`,
              defaultMessage: 'Settings'
            }),
            href: '#'
          },
          {
            name: intl.formatMessage({
              id: `transactions.tab.create`,
              defaultMessage: 'New Transaction'
            })
          }
        ]}
      />

      <PageHeader.Root>
        <PageHeader.Wrapper className="border-none">
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'transactions.create.title',
              defaultMessage: 'New Transaction'
            })}
          />
        </PageHeader.Wrapper>
      </PageHeader.Root>

      {children}
    </TransactionProvider>
  )
}
