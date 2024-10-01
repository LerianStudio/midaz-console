import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type SidebarItemIconButtonProps = {
  title: string
  icon: React.ReactNode
  href: string
  active?: boolean
}

export const SidebarItemIconButton = ({
  title,
  icon,
  href,
  active
}: SidebarItemIconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: active ? 'activeLink' : 'hoverLink',
                size: 'icon'
              }),
              'group/link flex h-9 w-9 items-center justify-center'
            )}
          >
            {React.cloneElement(icon as any, {
              className: cn(
                'group-hover/link:text-black h-6 w-6 text-shadcn-400',
                active && 'text-black'
              )
            })}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
