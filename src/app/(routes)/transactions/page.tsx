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

  const [pendingLedgerId, setPendingLedgerId] = React.useState<string>('')
  const [saveAsDefault, setSaveAsDefault] = React.useState<boolean>(false)

  const [activeLedgerId, setActiveLedgerId] = React.useState<string>('')
  const [storedDefaultLedgerId, setStoredDefaultLedgerId] = React.useState<
    string | null
  >(null)

  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  React.useEffect(() => {
    const storedLedgerId = localStorage.getItem('defaultTransactionLedgerId')
    if (storedLedgerId) {
      setStoredDefaultLedgerId(storedLedgerId)
    }
    setIsInitialized(true)
  }, [])

  React.useEffect(() => {
    if (!isInitialized || !ledgers?.items || !storedDefaultLedgerId) return

    const found = ledgers.items.some(
      (ledger) => ledger.id === storedDefaultLedgerId
    )
    if (!found) {
      localStorage.removeItem('defaultTransactionLedgerId')
      setStoredDefaultLedgerId(null)
    }
  }, [isInitialized, ledgers, storedDefaultLedgerId])

  const onLoadLedger = React.useCallback(() => {
    if (!pendingLedgerId) return

    setActiveLedgerId(pendingLedgerId)

    if (saveAsDefault) {
      localStorage.setItem('defaultTransactionLedgerId', pendingLedgerId)
      setStoredDefaultLedgerId(pendingLedgerId)
    } else {
      localStorage.removeItem('defaultTransactionLedgerId')
      setStoredDefaultLedgerId(null)
    }
  }, [pendingLedgerId, saveAsDefault])

  const onCreateTransaction = React.useCallback(() => {
    const ledgerId = storedDefaultLedgerId || activeLedgerId
    if (!ledgerId) {
      console.warn('No ledger selected, cannot create a new transaction.')
      return
    }
    router.push(`/ledgers/${ledgerId}/transactions/create`)
  }, [storedDefaultLedgerId, activeLedgerId, router])

  if (!isInitialized) {
    return (
      <div>
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
        <Skeleton className="h-[80px] w-full bg-zinc-200" />
      </div>
    )
  }

  const isLedgerLoaded = Boolean(activeLedgerId || storedDefaultLedgerId)

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

          {storedDefaultLedgerId && (
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

      {isLedgerLoaded ? (
        <div className="mt-10">
          <EntityBox.Root>
            <EntityBox.Actions className="flex w-full justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-gray-600">
                  {intl.formatMessage({
                    id: 'ledger.title',
                    defaultMessage: 'Ledger'
                  })}
                </p>

                <Select
                  value={storedDefaultLedgerId || activeLedgerId}
                  onValueChange={(val) => {
                    setActiveLedgerId(val)
                    setStoredDefaultLedgerId(val)
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

              <Button variant="default" onClick={onCreateTransaction}>
                {intl.formatMessage({
                  id: 'transactions.create.title',
                  defaultMessage: 'New Transaction'
                })}
              </Button>
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
            <Button variant="default" onClick={onCreateTransaction}>
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
      )}
    </React.Fragment>
  )
}
