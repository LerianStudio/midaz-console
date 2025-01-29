'use client'

import React from 'react'

import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListLedgers } from '@/client/ledgers'
import { useListTransactions } from '@/client/transactions'

import { TransactionsHeader } from './transactions-header'
import { TransactionsView } from './transactions-view'
import { useQueryParams } from '@/hooks/use-query-params'

export default function TransactionsPage() {
  const { currentOrganization } = useOrganization()

  const [selectedLedgerId, setSelectedLedgerId] = React.useState('')
  const [saveAsDefault, setSaveAsDefault] = React.useState(false)

  const [isInitialized, setIsInitialized] = React.useState(false)
  const [pendingLedgerId, setPendingLedgerId] = React.useState('')
  const [total, setTotal] = React.useState(0)
  const hasLedgerLoaded = Boolean(selectedLedgerId)

  const { form, searchValues, pagination } = useQueryParams({ total })

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  const { data: transactions, isLoading: isLoadingTx } = useListTransactions({
    organizationId: currentOrganization?.id!,
    ledgerId: selectedLedgerId,
    ...(searchValues as any)
  })

  React.useEffect(() => {
    const storedLedgerId = localStorage.getItem('defaultTransactionLedgerId')
    if (storedLedgerId) {
      setSelectedLedgerId(storedLedgerId)
    }
    setIsInitialized(true)
  }, [])

  React.useEffect(() => {
    if (!isInitialized || !ledgers?.items || !selectedLedgerId) return
    const found = ledgers.items.some((l) => l.id === selectedLedgerId)
    if (!found) {
      localStorage.removeItem('defaultTransactionLedgerId')
      setSelectedLedgerId('')
    }
  }, [isInitialized, ledgers, selectedLedgerId])

  React.useEffect(() => {
    setTotal(transactions?.items?.length || 0)
  }, [transactions?.items?.length])

  const transactionsState = {
    ledgers,
    transactions,
    selectedLedgerId,
    setSelectedLedgerId,
    pendingLedgerId,
    setPendingLedgerId,
    saveAsDefault,
    setSaveAsDefault,
    isInitialized,
    isLoadingLedgers,
    isLoadingTx,
    form,
    total,
    pagination
  }

  return (
    <React.Fragment>
      <TransactionsHeader hasLedgerLoaded={hasLedgerLoaded} />
      <div className="mt-10">
        <TransactionsView transactionsState={transactionsState} />
      </div>
    </React.Fragment>
  )
}
