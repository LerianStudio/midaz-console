import React from 'react'
import { TransactionsDataTable } from './transactions-data-table'

type TransactionsViewProps = {
  ledgers: any
  selectedLedgerId: string
  setSelectedLedgerId: (id: string) => void
  transactions: any
}

export const TransactionsView = ({
  ledgers,
  transactions,
  selectedLedgerId,
  setSelectedLedgerId
}: TransactionsViewProps) => {
  return (
    <div className="mt-10">
      <TransactionsDataTable
        ledgers={ledgers}
        transactions={transactions}
        selectedLedgerId={selectedLedgerId}
        setSelectedLedgerId={setSelectedLedgerId}
      />
    </div>
  )
}
