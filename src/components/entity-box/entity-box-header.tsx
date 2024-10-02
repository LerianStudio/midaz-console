import React, { ElementType } from 'react'
import { cn } from '@/lib/utils'

type EntityBoxHeaderProps = {
  title: string
  subtitle?: string
  className?: string
}

export const EntityBoxHeader = ({
  title,
  subtitle,
  className,
  ...props
}: EntityBoxHeaderProps) => {
  return (
    <div className={cn('flex flex-col items-start', className)} {...props}>
      <h1 className="text-lg font-bold text-[#52525B]">{title}</h1>
      <p className="text-sm text-shadcn-400">{subtitle}</p>
    </div>
  )
}
