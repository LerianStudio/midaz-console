import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { buttonVariants } from './button'
import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Category } from '@/types/SidebarType'
import { LinkWithLocale } from 'next-export-i18n'

interface NavProps {
  isCollapsed: boolean
  categories: Category[]
}

export const Nav: FC<NavProps> = ({ categories, isCollapsed }) => {
  const pathName = usePathname()

  const isActive = (href: string) => {
    if (href === '/' && pathName === '/') {
      return true
    }

    if (href !== '/' && pathName.startsWith(href)) {
      return true
    }

    return false
  }

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=false]:min-w-[150px] data-[collapsed=true]:py-2"
      >
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {!isCollapsed && category.name && (
              <div className="my-2 px-2 font-bold text-foreground">
                {category.name}
              </div>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              {category.links.map((link, linkIndex) =>
                isCollapsed ? (
                  <Tooltip key={linkIndex} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <LinkWithLocale
                        href={link.href}
                        className={cn(
                          buttonVariants({
                            variant: isActive(link.href) ? 'default' : 'ghost',
                            size: 'icon'
                          }),
                          'h-9 w-9'
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
                      </LinkWithLocale>
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
                  <LinkWithLocale
                    key={linkIndex}
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: isActive(link.href) ? 'default' : 'ghost',
                        size: 'sm'
                      }),
                      'justify-start'
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.title}</span>
                    {link.label && (
                      <span
                        className={cn(
                          'ml-auto',
                          link.variant === 'default' &&
                            'text-background dark:text-white'
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </LinkWithLocale>
                )
              )}
            </nav>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
