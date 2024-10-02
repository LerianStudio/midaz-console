import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'
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
            {React.cloneElement(icon as React.ReactElement, {
              className: cn(
                'group-hover/link:text-accent-foreground h-6 w-6 text-shadcn-400',
                active && 'group-hover/link:text-black'
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
