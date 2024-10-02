import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EntityBoxRootProps = {
  children: ReactNode
  className?: string
}

export const EntityBoxRoot = ({
  children,
  className,
  ...props
}: EntityBoxRootProps) => {
  return (
    <div
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
