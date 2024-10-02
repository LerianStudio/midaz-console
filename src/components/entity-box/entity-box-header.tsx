import React, { ElementType } from 'react'
import { cn } from '@/lib/utils'

type EntityBoxHeaderProps = {
  title: string
  subtitle?: string
  icon?: ElementType
  className?: string
  iconClassName?: string
}

export const EntityBoxHeader = ({
  title,
  subtitle,
  className
}: EntityBoxHeaderProps) => {
  return (
    <div className={cn('flex flex-col items-start', className)}>
      <h1 className="text-lg font-bold text-[#52525B]">{title}</h1>
      <p className="text-sm text-shadcn-400">{subtitle}</p>
    </div>
  )
}
