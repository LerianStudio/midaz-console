import { cn } from '@/lib/utils'
import React from 'react'
import { Paper, PaperProps } from '../ui/paper'

const EntityDataTableRoot = React.forwardRef<HTMLDivElement, PaperProps>(
  (props) => <Paper {...props} />
)
EntityDataTableRoot.displayName = 'EntityDataTable'

const EntityDataTableFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-3', className)} {...props} />
))
EntityDataTableFooter.displayName = 'EntityDataTableFooter'

const EntityDataTableFooterText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm italic leading-8 text-shadcn-400', className)}
    {...props}
  />
))
EntityDataTableFooterText.displayName = 'EntityDataTableFooterText'

export const EntityDataTable = {
  Root: EntityDataTableRoot,
  Footer: EntityDataTableFooter,
  FooterText: EntityDataTableFooterText
}
