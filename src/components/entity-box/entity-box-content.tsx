import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EntityBoxContentProps = {
  children: ReactNode
  className?: string
}

export const EntityBoxContent = ({
  children,
  className,
  ...props
}: EntityBoxContentProps) => {
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  )
}
