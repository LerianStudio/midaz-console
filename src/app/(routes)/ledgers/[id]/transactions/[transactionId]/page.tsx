'use client'

import { useParams } from 'next/navigation'
import { useIntl } from 'react-intl'
import { useGetTransactionById } from '@/client/transactions' // Você precisará criar este hook
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { PageHeader } from '@/components/page-header'
import { Breadcrumb } from '@/components/breadcrumb'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'

const TransactionDetailsPage = () => {
  const intl = useIntl()
  const { id: ledgerId, transactionId } = useParams<{
    id: string
    transactionId: string
  }>()
  const { currentOrganization } = useOrganization()

  const { data: transaction, isLoading } = useGetTransactionById({
    organizationId: currentOrganization.id!,
    ledgerId,
    transactionId
  })

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: intl.formatMessage({
        id: 'entity.ledgers',
        defaultMessage: 'Ledgers'
      }),
      href: '/ledgers'
    },
    {
      name: transaction?.description || transactionId,
      href: `/ledgers/${ledgerId}/transactions/${transactionId}`
    }
  ])

  if (isLoading) {
    return <div>Loading...</div> // Você pode criar um componente de skeleton
  }

  return (
    <div>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          <Breadcrumb paths={breadcrumbPaths} />
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'transactions.details.title',
              defaultMessage: 'Transaction Details'
            })}
          />
        </PageHeader.Wrapper>
      </PageHeader.Root>

      {/* Adicione os detalhes da transação aqui */}
      <div className="mt-6">
        <pre>{JSON.stringify(transaction, null, 2)}</pre>
      </div>
    </div>
  )
}

export default TransactionDetailsPage
