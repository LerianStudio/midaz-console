'use client'

import { useListLedgers } from '@/client/ledgers'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Paper } from '@/components/ui/paper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { isEmpty, isNull } from 'lodash'
import { ArrowLeftRightIcon, ChevronRight } from 'lucide-react'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

export default function TransactionsPage() {
  const intl = useIntl()
  const { currentOrganization } = useOrganization()
  const [selectedLedger, setSelectedLedger] = React.useState()

  const { data: ledgers, isLoading: isLoadingLedgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  console.log(isNull(ledgers?.items))

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

          {isEmpty(ledgers?.items) && (
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

      <Paper className="flex gap-8 p-8">
        <div className="my-12 flex w-3/6 flex-col">
          <div className="flex flex-col gap-8">
            <p>
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
              <Button icon={<ChevronRight size={24} />} iconPlacement="end">
                {intl.formatMessage({
                  id: 'ledgers.title',
                  defaultMessage: 'Ledgers'
                })}
              </Button>
            ) : (
              <Select
                disabled={isLoadingLedgers || !ledgers?.items?.length}
                onValueChange={(selectedLedgerId: any) => {
                  setSelectedLedger(selectedLedgerId)
                  console.log('Selected Ledger ID:', selectedLedgerId)
                }}
              >
                <SelectTrigger className="w-48">
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
            )}

            {selectedLedger && (
              <Button>
                {intl.formatMessage({
                  id: 'common.load',
                  defaultMessage: 'Load'
                })}
              </Button>
            )}
          </div>

          {selectedLedger && (
            <div className="items-top mt-8 flex space-x-2">
              <Checkbox id="defaultLedger" />
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
