import { Button } from '@/components/ui/button/button'
import { HelpCircle, Plus } from 'lucide-react'
import DropdownButton from '../dropdown-button'
import { CollapsibleTrigger } from '../ui/collapsible'
import React from 'react'

type ActionButtonsProps = {
  type: 'listing' | 'entity'
  helperTriggerTranslate?: { question: string }
  listingTemplateTranslate?: { addButton: string }
  onCreate?: () => void
}

export const ActionButtons = ({
  type,
  helperTriggerTranslate,
  listingTemplateTranslate,
  onCreate
}: ActionButtonsProps) => (
  <div className="flex gap-8">
    {type === 'listing' && (
      <React.Fragment>
        <CollapsibleTrigger asChild>
          <Button variant="link" className="flex gap-2 pr-0">
            <span className="text-sm font-medium text-[#3f3f46]">
              {helperTriggerTranslate?.question}
            </span>
            <HelpCircle className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>

        <div className="flex gap-2">
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
      </React.Fragment>
    )}

    {type === 'entity' && (
      <div className="flex max-h-10 items-center gap-7">
        <span className="text-sm font-medium text-shadcn-400">Status:</span>

        <DropdownButton
          buttonText="Active"
          buttonItems={[{ label: 'Inativar' }]}
        />
      </div>
    )}
  </div>
)
