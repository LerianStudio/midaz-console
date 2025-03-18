'use client'

import React from 'react'
import { useIntl } from 'react-intl'
import { Book, ChevronsUpDown } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import { useOrganization } from '@/context/organization-provider/organization-provider-client'
import { useListLedgers } from '@/client/ledgers'
import { Button } from './ui/button'
import { LedgerType } from '@/types/ledgers-type'

const LedgerCommand = ({
  ledgers,
  onSelect
}: {
  ledgers: LedgerType[]
  onSelect: (id: string) => void
}) => {
  const intl = useIntl()
  const [query, setQuery] = React.useState('')

  const filteredLedgers = React.useMemo(() => {
    return ledgers.filter((ledger) =>
      ledger.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [ledgers, query])

  return (
    <Command>
      <CommandInput
        placeholder={intl.formatMessage({
          id: 'common.search',
          defaultMessage: 'Search...'
        })}
        value={query}
        onValueChange={setQuery}
        className="border-b px-2 py-1 pr-10"
      />

      <CommandList className="max-h-[50vh] overflow-y-auto">
        {filteredLedgers.length === 0 ? (
          <CommandEmpty>
            {intl.formatMessage({
              id: 'common.noOptions',
              defaultMessage: 'No options found.'
            })}
          </CommandEmpty>
        ) : (
          <CommandGroup>
            {filteredLedgers.map((ledger) => (
              <CommandItem key={ledger.id} onSelect={() => onSelect(ledger.id)}>
                {ledger.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}

export const LedgerSelector = () => {
  const intl = useIntl()
  const [openCommand, setOpenCommand] = React.useState(false)
  const { currentOrganization, currentLedger, setLedger } = useOrganization()
  const { data: ledgers } = useListLedgers({
    organizationId: currentOrganization?.id!
  })

  React.useEffect(() => {
    if (
      ledgers?.items?.length &&
      (!currentLedger?.id ||
        !ledgers.items.some(
          (ledger: LedgerType) => ledger.id === currentLedger.id
        ))
    ) {
      setLedger(ledgers.items[0])
    }
  }, [currentOrganization, ledgers, currentLedger?.id, setLedger])

  const hasLedgers = !!ledgers?.items?.length
  const totalLedgers = ledgers?.items?.length ?? 0
  const isLargeList = totalLedgers >= 10
  const isSingle = totalLedgers === 1

  if (isSingle) {
    return (
      <Button
        disabled
        className="flex cursor-default items-center gap-4 disabled:opacity-100"
        variant="outline"
      >
        <Book size={20} className="text-zinc-400" />
        <span className="pt-[2px] text-xs font-normal uppercase text-zinc-400">
          {intl.formatMessage({
            id: 'ledger.selector.currentLedger.label',
            defaultMessage: 'Current Ledger'
          })}
        </span>
        <span className="text-sm font-semibold text-zinc-800">
          {ledgers?.items[0].name}
        </span>
      </Button>
    )
  }

  const handleSelectChange = (id: string) => {
    setLedger(ledgers?.items.find((ledger) => ledger.id === id)!)
  }

  const handleCommandChange = (id: string) => {
    setLedger(ledgers?.items.find((ledger) => ledger.id === id)!)
    setOpenCommand(false)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select
              value={currentLedger?.id ?? undefined}
              onValueChange={handleSelectChange}
              onOpenChange={(open) => !open && setOpenCommand(false)}
              disabled={!hasLedgers}
            >
              <SelectTrigger className="w-fit text-sm font-semibold text-zinc-800">
                <div className="flex items-center gap-4">
                  <Book size={20} className="text-zinc-400" />
                  <span className="pt-[2px] text-xs font-normal uppercase text-zinc-400">
                    {intl.formatMessage({
                      id: 'ledger.selector.currentLedger.label',
                      defaultMessage: 'Current Ledger'
                    })}
                  </span>
                  <SelectValue placeholder="Select a ledger" />
                </div>
              </SelectTrigger>

              <SelectContent>
                {isLargeList ? (
                  <SelectGroup className="px-3 pb-3">
                    <SelectLabel className="text-xs font-medium uppercase text-zinc-400">
                      {intl.formatMessage({
                        id: 'ledgers.title',
                        defaultMessage: 'Ledgers'
                      })}
                    </SelectLabel>
                    <SelectItem
                      disabled
                      value={currentLedger?.id || 'no-selection'}
                      className="font-medium text-zinc-800 data-[disabled]:opacity-100"
                    >
                      {ledgers?.items?.find(
                        (ledger: any) => ledger.id === currentLedger?.id
                      )?.name ||
                        intl.formatMessage({
                          id: 'ledger.selector.placeholder',
                          defaultMessage: 'Select Ledger'
                        })}
                    </SelectItem>

                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex w-full justify-start rounded-lg border p-2"
                        onClick={() => setOpenCommand((prev) => !prev)}
                        icon={<ChevronsUpDown className="text-zinc-400" />}
                        iconPlacement="far-end"
                      >
                        {intl.formatMessage({
                          id: 'ledger.selector.selectAnother.label',
                          defaultMessage: 'Select another...'
                        })}
                      </Button>

                      {openCommand && (
                        <div
                          className="my-3 rounded-lg border"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <LedgerCommand
                            ledgers={ledgers!.items}
                            onSelect={handleCommandChange}
                          />
                        </div>
                      )}
                    </div>
                  </SelectGroup>
                ) : (
                  <SelectGroup className="px-3 pb-3">
                    <SelectLabel className="text-xs font-medium uppercase text-zinc-400">
                      {intl.formatMessage({
                        id: 'ledgers.title',
                        defaultMessage: 'Ledgers'
                      })}
                    </SelectLabel>
                    {ledgers?.items?.map((ledger: any) => (
                      <SelectItem key={ledger.id} value={ledger.id}>
                        {ledger.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>

        {!hasLedgers && (
          <TooltipContent side="bottom">
            {intl.formatMessage({
              id: 'ledger.selector.noledgers',
              defaultMessage: 'No ledgers available. Please create one first.'
            })}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
