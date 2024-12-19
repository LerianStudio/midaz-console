import React from 'react'
import { cn } from '@/lib/utils'

type EntityBoxRootProps = React.HTMLAttributes<HTMLDivElement>

const EntityBoxRoot = React.forwardRef<HTMLDivElement, EntityBoxRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-2 flex justify-between rounded-lg bg-white p-6 shadow-entityBox',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

EntityBoxRoot.displayName = 'EntityBoxRoot'

interface EntityBoxHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
}

const EntityBoxHeader = React.forwardRef<HTMLDivElement, EntityBoxHeaderProps>(
  ({ title, subtitle, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-start', className)}
        {...props}
      >
        <h1 className="text-lg font-bold text-zinc-600">{title}</h1>
        {subtitle && <p className="text-sm text-shadcn-400">{subtitle}</p>}
      </div>
    )
  }
)

EntityBoxHeader.displayName = 'EntityBoxHeader'

type EntityBoxContentProps = React.HTMLAttributes<HTMLDivElement>

const EntityBoxContent = React.forwardRef<
  HTMLDivElement,
  EntityBoxContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  )
})

EntityBoxContent.displayName = 'EntityBoxContent'

type EntityBoxActionsProps = React.HTMLAttributes<HTMLDivElement>

const EntityBoxActions = React.forwardRef<
  HTMLDivElement,
  EntityBoxActionsProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex items-center', className)} {...props}>
      {children}
    </div>
  )
})

EntityBoxActions.displayName = 'EntityBoxActions'

export const EntityBox = {
  Root: EntityBoxRoot,
  Header: EntityBoxHeader,
  Content: EntityBoxContent,
  Actions: EntityBoxActions
}
