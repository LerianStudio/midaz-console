import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import { truncateString } from '@/helpers'
import { SheetHeaderSectionProps } from '@/types/sheet-type'

export const SheetHeaderSection = ({ sheetInfo }: SheetHeaderSectionProps) => (
  <SheetHeader>
    <SheetTitle className="flex text-xl font-bold text-[#52525b]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{truncateString(sheetInfo.title, 30)}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{sheetInfo.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SheetTitle>
    <SheetDescription className="text-sm font-medium text-shadcn-500">
      {sheetInfo.description}
    </SheetDescription>
  </SheetHeader>
)
