'use client'

import React from 'react'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListLedgers } from '@/client/ledgers'
import { useListTransactions } from '@/client/transactions'
import { TransactionsDataTable } from './transactions-data-table'
import { SelectLedgerPanel } from './select-ledger-panel'
import { TransactionsSkeleton } from './transactions-skeleton'
import { useQueryParams } from '@/hooks/use-query-params'
import { useDefaultLedgerTransactions } from '@/hooks/use-default-ledger-transactions'
import { PageHeader } from '@/components/page-header'
import { useIntl } from 'react-intl'

export default function TransactionsPage() {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const [total, setTotal] = React.useState(0)

  const { form, searchValues, pagination } = useQueryParams({ total })

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  const {
    selectedLedgerId,
    setSelectedLedgerId,
    saveAsDefault,
    setSaveAsDefault,
    isInitialized,
    pendingLedgerId,
    setPendingLedgerId,
    handleLoadLedger
  } = useDefaultLedgerTransactions({ ledgers })

  const { data: transactions, isLoading: isLoadingTransactions } =
    useListTransactions({
      organizationId: currentOrganization?.id!,
      ledgerId: selectedLedgerId,
      ...(searchValues as any)
    })

  React.useEffect(() => {
    setTotal(transactions?.items?.length || 0)
  }, [transactions?.items])

  const isLoadingEverything =
    !isInitialized || isLoadingLedgers || isLoadingTransactions
  const hasLedgerLoaded = Boolean(selectedLedgerId)

  return (
    <React.Fragment>
      <PageHeader.Root>
        <PageHeader.Wrapper>
          <PageHeader.InfoTitle
            title={intl.formatMessage({
              id: 'transactions.title',
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

      {isLoadingEverything ? (
        <div className="mt-10">
          <TransactionsSkeleton />
        </div>
      ) : hasLedgerLoaded ? (
        <div className="mt-10">
          <TransactionsDataTable
            transactionsState={{
              ledgers,
              transactions,
              form,
              total,
              pagination,
              selectedLedgerId,
              setSelectedLedgerId
            }}
          />
        </div>
      ) : (
        <div className="mt-10">
          <SelectLedgerPanel
            ledgers={ledgers}
            pendingLedgerId={pendingLedgerId}
            setPendingLedgerId={setPendingLedgerId}
            saveAsDefault={saveAsDefault}
            setSaveAsDefault={setSaveAsDefault}
            onLoadLedger={handleLoadLedger}
          />
        </div>
      )}
    </React.Fragment>
  )
}
