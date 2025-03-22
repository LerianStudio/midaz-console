'use client'

import React from 'react'
import { useIntl } from 'react-intl'
import { Book, ChevronsUpDown } from 'lucide-react'
import {
  Select,
  SelectTrigger,
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
import { LoadingButton } from './ui/loading-button'

const LedgerCommand = ({
  ledgers,
  onSelect,
  organizationId
}: {
  ledgers: LedgerType[]
  onSelect: (ledger: LedgerType) => void
  organizationId: string
}) => {
  const intl = useIntl()
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [allLedgers, setAllLedgers] = React.useState<LedgerType[]>(ledgers)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(ledgers.length === 10)

  React.useEffect(() => {
    setAllLedgers(ledgers)
    setPage(1)
    setHasMore(ledgers.length === 10)
  }, [ledgers])

  const filteredLedgers = React.useMemo(() => {
    if (!query) return allLedgers
    return allLedgers.filter((ledger) =>
      ledger.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [allLedgers, query])

  const loadMore = async () => {
    if (!isLoadingMore && organizationId) {
      setIsLoadingMore(true)
      try {
        const nextPage = page + 1
        const response = await fetch(
          `/api/organizations/${organizationId}/ledgers/ledgers-assets?limit=10&page=${nextPage}`
        )
        const data = await response.json()

        if (data.items && data.items.length > 0) {
          const parsedItems = data.items.map((item: any) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : null
          }))

          setAllLedgers((prev) => {
            const newLedgers = [...prev]
            parsedItems.forEach((newLedger: LedgerType) => {
              if (!newLedgers.some((l) => l.id === newLedger.id)) {
                newLedgers.push(newLedger)
              }
            })
            return newLedgers
          })

          setPage(nextPage)
          setHasMore(data.items.length === 10)
        } else {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error loading more ledgers:', error)
      } finally {
        setIsLoadingMore(false)
      }
    }
  }

  return (
    <Command className="w-full">
      <CommandInput
        placeholder={intl.formatMessage({
          id: 'common.search',
          defaultMessage: 'Search...'
        })}
        value={query}
        onValueChange={setQuery}
        className="border-b px-2 py-1 pr-10"
      />

      <CommandList className="max-h-max overflow-y-auto">
        {filteredLedgers.length === 0 ? (
          <CommandEmpty>
            {intl.formatMessage({
              id: 'common.noOptions',
              defaultMessage: 'No options found.'
            })}
          </CommandEmpty>
        ) : (
          <CommandGroup>
            {filteredLedgers.map((ledger) => {
              const processedLedger: LedgerType = {
                ...ledger,
                createdAt:
                  ledger.createdAt instanceof Date
                    ? ledger.createdAt
                    : new Date(ledger.createdAt),
                updatedAt:
                  ledger.updatedAt instanceof Date
                    ? ledger.updatedAt
                    : new Date(ledger.updatedAt),
                deletedAt: ledger.deletedAt
                  ? ledger.deletedAt instanceof Date
                    ? ledger.deletedAt
                    : new Date(ledger.deletedAt)
                  : null
              }

              return (
                <CommandItem
                  key={ledger.id}
                  onSelect={() => {
                    onSelect(processedLedger)
                  }}
                  className="truncate"
                >
                  {ledger.name}
                </CommandItem>
              )
            })}

            {!query && hasMore && (
              <div className="border-t border-gray-100 p-1">
                <LoadingButton
                  onClick={loadMore}
                  loading={isLoadingMore}
                  variant="outline"
                  className="w-full"
                >
                  {intl.formatMessage({
                    id: 'common.loadMore',
                    defaultMessage: 'Load more...'
                  })}
                </LoadingButton>
              </div>
            )}
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

  const [manuallySelectedLedger, setManuallySelectedLedger] = React.useState<
    string | null
  >(null)

  const handleCommandChange = (ledger: LedgerType) => {
    const processedLedger = {
      ...ledger,
      createdAt:
        ledger.createdAt instanceof Date
          ? ledger.createdAt
          : new Date(ledger.createdAt),
      updatedAt:
        ledger.updatedAt instanceof Date
          ? ledger.updatedAt
          : new Date(ledger.updatedAt),
      deletedAt: ledger.deletedAt
        ? ledger.deletedAt instanceof Date
          ? ledger.deletedAt
          : new Date(ledger.deletedAt)
        : null
    }

    setLedger(processedLedger)
    setManuallySelectedLedger(processedLedger.id)
    setOpenCommand(false)
  }

  React.useEffect(() => {
    if (
      ledgers?.items?.length &&
      !currentLedger?.id &&
      !manuallySelectedLedger
    ) {
      setLedger(ledgers.items[0])
    }
  }, [ledgers, currentLedger?.id, setLedger, manuallySelectedLedger])

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
    const selectedLedger = ledgers?.items.find((ledger) => ledger.id === id)
    if (selectedLedger) {
      setLedger(selectedLedger)
      setManuallySelectedLedger(id)
    }
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
                  <span className="text-sm font-semibold text-zinc-800">
                    {currentLedger?.name ||
                      intl.formatMessage({
                        id: 'ledger.selector.placeholder',
                        defaultMessage: 'Select Ledger'
                      })}
                  </span>
                </div>
              </SelectTrigger>

              <SelectContent className="w-[var(--radix-select-trigger-width)]">
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
                      value={currentLedger?.id}
                      className="font-medium text-zinc-800 data-[disabled]:opacity-100"
                    >
                      {currentLedger?.name ||
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
                          className="my-3 w-fit rounded-lg border"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <LedgerCommand
                            ledgers={ledgers!.items}
                            onSelect={handleCommandChange}
                            organizationId={currentOrganization?.id!}
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
