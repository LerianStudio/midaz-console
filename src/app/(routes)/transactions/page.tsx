'use client'

import { useListLedgers } from '@/client/ledgers'
import { PageHeader } from '@/components/page-header'
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
import { Skeleton } from '@/components/ui/skeleton'
import { EntityBox } from '@/components/entity-box'
import { EmptyResource } from '@/components/empty-resource'

export default function TransactionsPage() {
  const intl = useIntl()
  const router = useRouter()
  const { currentOrganization } = useOrganization()

  const [selectedLedger, setSelectedLedger] = React.useState<string>('')
  const [loadAsDefault, setLoadAsDefault] = React.useState<boolean>(false)

  const [currentLedger, setCurrentLedger] = React.useState<string>('')
  const [defaultLedgerId, setDefaultLedgerId] = React.useState<string | null>(
    null
  )

  const [initialized, setInitialized] = React.useState<boolean>(false)

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  React.useEffect(() => {
    const storedLedgerId = localStorage.getItem('defaultTransactionLedgerId')
    if (storedLedgerId) {
      setDefaultLedgerId(storedLedgerId)
    }
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    if (!initialized || !ledgers?.items || !defaultLedgerId) return

    const found = ledgers.items.some((ledger) => ledger.id === defaultLedgerId)
    if (!found) {
      localStorage.removeItem('defaultTransactionLedgerId')
      setDefaultLedgerId(null)
    }
  }, [initialized, ledgers, defaultLedgerId])

  const handleLoadLedger = React.useCallback(() => {
    if (!selectedLedger) return

    setCurrentLedger(selectedLedger)

    if (loadAsDefault) {
      localStorage.setItem('defaultTransactionLedgerId', selectedLedger)
      setDefaultLedgerId(selectedLedger)
    } else {
      localStorage.removeItem('defaultTransactionLedgerId')
      setDefaultLedgerId(null)
    }
  }, [selectedLedger, loadAsDefault])

  const handleNewTransaction = React.useCallback(() => {
    const ledgerId = defaultLedgerId || currentLedger
    if (!ledgerId) {
      console.warn('No ledger selected, cannot create a new transaction.')
      return
    }
    router.push(`/ledgers/${ledgerId}/transactions/create`)
  }, [defaultLedgerId, currentLedger, router])

  if (!initialized) {
    return (
      <div>
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
      </div>
    )
  }

  const hasLedgerLoaded = Boolean(currentLedger || defaultLedgerId)

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

          {defaultLedgerId && (
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
            id: 'ledgers.helperTrigger.question',
            defaultMessage: 'What is a Ledger?'
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

      {hasLedgerLoaded ? (
        <div className="mt-10">
          <EntityBox.Root>
            <EntityBox.Actions className="flex w-full justify-between gap-4">
              <React.Fragment>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium text-gray-600">
                    {intl.formatMessage({
                      id: 'ledger.title',
                      defaultMessage: 'Ledger'
                    })}
                  </p>

                  <Select
                    value={defaultLedgerId || currentLedger}
                    onValueChange={(val) => {
                      setCurrentLedger(val)
                      setDefaultLedgerId(val)
                      localStorage.setItem('defaultTransactionLedgerId', val)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Ledger" />
                    </SelectTrigger>

                    <SelectContent>
                      {ledgers?.items?.map((ledger) => (
                        <SelectItem key={ledger.id} value={ledger.id}>
                          {ledger.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="default" onClick={handleNewTransaction}>
                  {intl.formatMessage({
                    id: 'transactions.create.title',
                    defaultMessage: 'New Transaction'
                  })}
                </Button>
              </React.Fragment>
            </EntityBox.Actions>
          </EntityBox.Root>

          <EmptyResource
            message={intl.formatMessage({
              id: 'transactions.emptyResource',
              defaultMessage: "You haven't created any transactions yet."
            })}
            extra={intl.formatMessage({
              id: 'transactions.emptyResourceExtra',
              defaultMessage: 'No transaction found.'
            })}
          >
            <Button variant="default" onClick={handleNewTransaction}>
              {intl.formatMessage({
                id: 'transactions.create.title',
                defaultMessage: 'New Transaction'
              })}
            </Button>
          </EmptyResource>
        </div>
      ) : (
        <Paper className="flex gap-8 p-8">
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
                    disabled={isLoadingLedgers || !ledgers?.items?.length}
                    value={selectedLedger}
                    onValueChange={(val) => setSelectedLedger(val)}
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

                  {selectedLedger && (
                    <Button onClick={handleLoadLedger}>
                      {intl.formatMessage({
                        id: 'common.load',
                        defaultMessage: 'Load'
                      })}
                    </Button>
                  )}
                </React.Fragment>
              )}
            </div>

            {selectedLedger && (
              <div className="items-top mt-8 flex space-x-2">
                <Checkbox
                  id="defaultLedger"
                  checked={loadAsDefault}
                  onCheckedChange={(checked) => {
                    setLoadAsDefault(Boolean(checked))
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
      )}
    </React.Fragment>
  )
}
