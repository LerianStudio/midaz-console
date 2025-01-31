'use client'

import React from 'react'
import { Paper } from '@/components/ui/paper'
import { ArrowLeftRightIcon } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormattedMessage, useIntl } from 'react-intl'

type SelectLedgerPanelProps = {
  ledgers: any
  pendingLedgerId: string
  setPendingLedgerId: (value: string) => void
  saveAsDefault: boolean
  setSaveAsDefault: (value: boolean) => void
  onLoadLedger: () => void
}

export function SelectLedgerPanel({
  ledgers,
  pendingLedgerId,
  setPendingLedgerId,
  saveAsDefault,
  setSaveAsDefault,
  onLoadLedger
}: SelectLedgerPanelProps) {
  const intl = useIntl()

  return (
    <Paper className="flex gap-8 p-8">
      <div className="my-12 flex w-3/6 flex-col">
        <LedgerIntroText />

        <div className="mt-4 flex gap-4">
          {!ledgers?.items || ledgers.items.length === 0 ? (
            <Button onClick={() => {}}>
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
                onValueChange={(value) => setPendingLedgerId(value)}
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
                  {ledgers?.items?.map((l: any) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
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
              onCheckedChange={(checked) => setSaveAsDefault(Boolean(checked))}
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
  )
}

const LedgerIntroText = () => {
  const intl = useIntl()

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-xl">
        <FormattedMessage
          id="transactions.section.description"
          defaultMessage="This is the {transactions} space. The movements that occur in all your ledgers are organized here."
          values={{
            transactions: (
              <FormattedMessage id="transactions" defaultMessage="transactions">
                {(text) => <span className="font-bold">{text}</span>}
              </FormattedMessage>
            )
          }}
        />
      </p>
      <span className="text-sm text-zinc-400">
        {intl.formatMessage({
          id: 'transactions.ledgers.subtitle',
          defaultMessage: 'Select a ledger to load the transactions.'
        })}
      </span>
    </div>
  )
}
