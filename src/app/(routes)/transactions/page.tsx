'use client'

import React from 'react'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListTransactions } from '@/client/transactions'
import { TransactionsDataTable } from './transactions-data-table'
import { TransactionsSkeleton } from './transactions-skeleton'
import { useQueryParams } from '@/hooks/use-query-params'
import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'
import { getBreadcrumbPaths } from '@/components/breadcrumb/get-breadcrumb-paths'
import { Breadcrumb } from '@/components/breadcrumb'

export default function TransactionsPage() {
  const intl = useIntl()
  const { currentOrganization, currentLedger } = useOrganization()
  const [total, setTotal] = React.useState(0)

  const { form, searchValues, pagination } = useQueryParams({ total })

  const { data: transactions, isLoading: isLoadingTransactions } =
    useListTransactions({
      organizationId: currentOrganization?.id!,
      ledgerId: currentLedger.id,
      ...(searchValues as any)
    })

  React.useEffect(() => {
    setTotal(transactions?.items?.length || 0)
  }, [transactions?.items])

  const hasLedgerLoaded = Boolean(currentLedger.id)

  const transactionsTableProps = {
    transactions,
    form,
    total,
    pagination,
    currentLedger
  }

  const breadcrumbPaths = getBreadcrumbPaths([
    {
      name: currentOrganization.legalName
    },
    {
      name: currentLedger.name
    },
    {
      name: intl.formatMessage({
        id: `common.transactions`,
        defaultMessage: 'Transactions'
      })
    }
  ])

  return (
    <React.Fragment>
      <Breadcrumb paths={breadcrumbPaths} />

      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'common.transactions',
              defaultMessage: 'Transactions'
            })}
            subtitle={intl.formatMessage({
              id: 'transactions.subtitle',
              defaultMessage:
                'View, edit, and manage the transactions of a specific ledger..'
            })}
          />

          {hasLedgerLoaded && (
            <PageHeader.ActionButtons>
              <PageHeader.CollapsibleInfoTrigger
                question={intl.formatMessage({
                  id: 'transactions.helperTrigger.question',
                  defaultMessage: 'What is a Transaction?'
                })}
              />
            </PageHeader.ActionButtons>
          )}
        </PageHeader.Wrapper>

        <PageHeader.CollapsibleInfo
          question={intl.formatMessage({
            id: 'transactions.helperTrigger.question',
            defaultMessage: 'What is a Transaction?'
          })}
          answer={intl.formatMessage({
            id: 'ledgers.helperTrigger.answer',
            defaultMessage:
              'Book with the record of all transactions and operations of the Organization.'
          })}
          seeMore={intl.formatMessage({
            id: 'ledgers.helperTrigger.seeMore',
            defaultMessage: 'Read the docs'
          })}
        />
      </PageHeader.Root>

      <div className="mt-10">
        {isLoadingTransactions && <TransactionsSkeleton />}
        {!isLoadingTransactions && hasLedgerLoaded && (
          <TransactionsDataTable {...transactionsTableProps} />
        )}
      </div>
    </React.Fragment>
  )
}
