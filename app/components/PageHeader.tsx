'use client'

import { cn } from '@/lib/utils'
import { Copy, ExternalLink, HelpCircle, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { useState } from 'react'
import useCustomToast from '@/hooks/useCustomToast'
import { useTranslations } from 'next-intl'
import DropdownButton from './DropdownButton'
import { HelperTriggerTranslate } from '@/types/HelperTriggerTranslate'
import { ListingTemplateTranslate } from '@/types/PageHeader'

type Props = {
  title: string
  subtitle?: string
  className?: string
  hasInfo?: boolean
  type?: 'listing' | 'entity'
  helperTriggerTranslate?: HelperTriggerTranslate
  listingTemplateTranslate?: ListingTemplateTranslate
  onCreate: () => void
}

export const PageHeader = ({
  title,
  subtitle,
  className,
  hasInfo = false,
  type,
  helperTriggerTranslate,
  listingTemplateTranslate,
  onCreate
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const { showInfo } = useCustomToast()

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
    showInfo(t('genericCopyMessage'))
  }

  const buttonItems = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
    { label: 'Item 4' }
  ]

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex w-full justify-between border-b">
        <div className="mb-12 flex flex-col gap-4">
          <h1 className={cn('text-4xl font-bold text-[#3f3f46]', className)}>
            {title}
          </h1>

          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-shadcn-400">{subtitle}</p>
            {type === 'entity' && subtitle && (
              <Copy
                size={16}
                onClick={() => handleCopyToClipboard(subtitle)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="flex gap-7">
          {hasInfo && (
            <CollapsibleTrigger asChild>
              <Button variant="link" className="flex gap-1">
                <span className="text-sm font-medium text-[#3f3f46]">
                  {helperTriggerTranslate?.question}
                </span>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          )}

          {type === 'listing' && (
            <div className="flex gap-2">
              <Button variant="outline" size="default">
                {listingTemplateTranslate?.configureButton}
              </Button>
              <Button
                variant="default"
                className="flex gap-2"
                size="default"
                onClick={onCreate}
              >
                <span>{listingTemplateTranslate?.addButton}</span>
                <Plus size={24} />
              </Button>
            </div>
          )}

          {type === 'entity' && (
            <div className="flex max-h-10 items-center gap-7">
              <span className="text-sm font-medium text-shadcn-400">
                Status:
              </span>

              <DropdownButton buttonText="Active" buttonItems={buttonItems} />
            </div>
          )}
        </div>
      </div>

      {hasInfo && (
        <CollapsibleContent>
          <div className="my-12 flex flex-col gap-3">
            <h1 className="text-xl font-bold text-[#3f3f46]">
              {helperTriggerTranslate?.question}
            </h1>

            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-shadcn-500">
                {helperTriggerTranslate?.answer}
              </p>

              <div className="flex items-center gap-1">
                <Button variant="link" onClick={() => {}} className="p-0">
                  {helperTriggerTranslate?.seeMore}
                </Button>
                <ExternalLink size={16} />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}
