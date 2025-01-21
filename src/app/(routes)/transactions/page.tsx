'use client'

import { useListLedgers } from '@/client/ledgers'
import { Button } from '@/components/ui/button'
import { Paper } from '@/components/ui/paper'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { isEmpty } from 'lodash'
import { ArrowLeftRightIcon, ChevronRight } from 'lucide-react'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/navigation'
import { TransactionsView } from './transactions-view'
import { TransactionsSkeleton } from './transactions-skeleton'
import { TransactionsHeader } from './transactions-header'
import { useListTransactions } from '@/client/transactions'

export default function TransactionsPage() {
  const intl = useIntl()
  const router = useRouter()
  const { currentOrganization } = useOrganization()

  const [selectedLedgerId, setSelectedLedgerId] = React.useState<string>('')
  const [saveAsDefault, setSaveAsDefault] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
  const [pendingLedgerId, setPendingLedgerId] = React.useState<string>('')

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
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

    const found = ledgers.items.some((ledger) => ledger.id === selectedLedgerId)
    if (!found) {
      localStorage.removeItem('defaultTransactionLedgerId')
      setSelectedLedgerId('')
    }
  }, [isInitialized, ledgers, selectedLedgerId])

  const { data: transactions, isLoading: isLoadingTransactions } =
    useListTransactions({
      organizationId: currentOrganization?.id!,
      ledgerId: selectedLedgerId,
      enabled: !!selectedLedgerId
    })

  const isLoadingEverything =
    !isInitialized || isLoadingLedgers || isLoadingTransactions

  const onLoadLedger = React.useCallback(() => {
    if (!pendingLedgerId) return

    setSelectedLedgerId(pendingLedgerId)

    if (saveAsDefault) {
      localStorage.setItem('defaultTransactionLedgerId', pendingLedgerId)
    } else {
      localStorage.removeItem('defaultTransactionLedgerId')
    }
  }, [pendingLedgerId, saveAsDefault])

  if (isLoadingEverything) {
    return (
      <React.Fragment>
        <TransactionsHeader />
        <div className="mt-10">
          <TransactionsSkeleton />
        </div>
      </React.Fragment>
    )
  }

  const hasLoadedLedger = Boolean(selectedLedgerId)

  if (hasLoadedLedger) {
    return (
      <React.Fragment>
        <TransactionsHeader hasLoadedLedger={hasLoadedLedger} />
        <TransactionsView
          ledgers={ledgers}
          transactions={transactions}
          selectedLedgerId={selectedLedgerId}
          setSelectedLedgerId={setSelectedLedgerId}
        />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <TransactionsHeader />

      <Paper className="mt-10 flex gap-8 p-8">
        <div className="my-12 flex w-3/6 flex-col">
          <div className="flex flex-col gap-8">
            <p className="max-w-xl">
              <FormattedMessage
                id="transactions.section.description"
                defaultMessage="This is the {transactions} space. The movements that occur in all your ledgers are organized here."
                values={{
                  transactions: (
                    <FormattedMessage
                      id="transactions"
                      defaultMessage="transactions"
                    >
                      {(text) => <span className="font-bold">{text}</span>}
                    </FormattedMessage>
                  )
                }}
              />
            </p>

            {isEmpty(ledgers?.items) ? (
              <span className="text-sm text-zinc-400">
                {intl.formatMessage({
                  id: 'transactions.emptyLedgers.subtitle',
                  defaultMessage: 'You need a ledger to create transactions.'
                })}
              </span>
            ) : (
              <span className="text-sm text-zinc-400">
                {intl.formatMessage({
                  id: 'transactions.ledgers.subtitle',
                  defaultMessage: 'Select a ledger to load the transactions.'
                })}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-4">
            {isEmpty(ledgers?.items) ? (
              <Button
                icon={<ChevronRight size={24} />}
                iconPlacement="end"
                onClick={() => router.push('/ledgers')}
              >
                {intl.formatMessage({
                  id: 'ledgers.title',
                  defaultMessage: 'Ledgers'
                })}
              </Button>
            ) : (
              <React.Fragment>
                <Select
                  disabled={!ledgers?.items?.length}
                  value={pendingLedgerId}
                  onValueChange={(val) => setPendingLedgerId(val)}
                >
                  <SelectTrigger className="w-fit">
                    <SelectValue
                      placeholder={intl.formatMessage({
                        id: 'common.select',
                        defaultMessage: 'Select'
                      })}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ledgers?.items?.map((ledger) => (
                      <SelectItem key={ledger.id} value={ledger.id}>
                        {ledger.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {pendingLedgerId && (
                  <Button onClick={onLoadLedger}>
                    {intl.formatMessage({
                      id: 'common.load',
                      defaultMessage: 'Load'
                    })}
                  </Button>
                )}
              </React.Fragment>
            )}
          </div>

          {pendingLedgerId && (
            <div className="items-top mt-8 flex space-x-2">
              <Checkbox
                id="defaultLedger"
                checked={saveAsDefault}
                onCheckedChange={(checked) => {
                  setSaveAsDefault(Boolean(checked))
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="defaultLedger"
                  className="text-sm font-medium leading-none text-zinc-400"
                >
                  {intl.formatMessage({
                    id: 'transactions.checkbox.text',
                    defaultMessage: 'Load this Ledger by default'
                  })}
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-3/6 items-center justify-end">
          <ArrowLeftRightIcon
            size={256}
            strokeWidth={0.2}
            className="text-zinc-300"
          />
        </div>
      </Paper>
    </React.Fragment>
  )
}
