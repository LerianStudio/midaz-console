import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { buttonVariants } from './button'
import { cn } from '@/lib/utils'
import { Category } from '@/types/sidebar-type'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
  isCollapsed: boolean
  categories: Category[]
}

export const Nav = ({ categories, isCollapsed }: NavProps) => {
  const pathName = usePathname()
  const locale = 'en-US'

  const isActive = (href: string) => {
    const localePrefix = `/${locale}`
    const adjustedHref = href === '/' ? localePrefix : `${localePrefix}${href}`

    return pathName === adjustedHref
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          'group flex flex-col gap-4 pt-4',
          isCollapsed && 'items-center',
          !isCollapsed && 'min-w-[219px]'
        )}
      >
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {!isCollapsed && category.name && (
              <div className="my-2 px-2">
                <p className="text-xs font-medium uppercase text-shadcn-400">
                  {category.name}
                </p>
              </div>
            )}
            <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
              {category.links.map((link, linkIndex) => {
                const [isHovered, setIsHovered] = useState(false)

                return isCollapsed ? (
                  <Tooltip key={linkIndex} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          buttonVariants({
                            variant: isActive(link.href)
                              ? 'activeLink'
                              : 'hoverLink',
                            size: 'icon'
                          }),
                          'flex h-9 w-9 items-center justify-center'
                        )}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <link.icon
                          className={cn(
                            'h-6 w-6 text-shadcn-400',
                            isHovered && 'text-white',
                            isActive(link.href) && 'text-black'
                          )}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="flex items-center gap-4"
                    >
                      {link.title}
                      {link.label && (
                        <span className="ml-auto text-muted-foreground">
                          {link.label}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: isActive(link.href)
                          ? 'activeLink'
                          : 'hoverLink',
                        size: 'sm'
                      }),
                      'flex items-center justify-start'
                    )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <link.icon
                      className={cn(
                        'mr-2 h-6 w-6 text-shadcn-400',
                        (isActive(link.href) || isHovered) && 'text-black'
                      )}
                    />
                    {!isCollapsed && <span>{link.title}</span>}
                    {link.label && (
                      <span
                        className={cn(
                          'ml-auto',
                          link.variant === 'default' && 'text-background'
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
