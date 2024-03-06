import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { buttonVariants } from './button'
import { cn } from '../../lib/utils'
import { FC } from 'react'
import { Category } from '@/types/SidebarType'

interface NavProps {
  isCollapsed: boolean
  categories: Category[]
}

export const Nav: FC<NavProps> = ({ categories, isCollapsed }) => {
  const router = useRouter()
  const { pathname } = router

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') {
      return true
    }

    if (href !== '/' && pathname.startsWith(href)) {
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
                      <Link href={link.href}>
                        <a
                          className={cn(
                            buttonVariants({
                              variant: isActive(link.href)
                                ? 'default'
                                : 'ghost',
                              size: 'icon'
                            }),
                            'flex h-9 w-9 items-center justify-center'
                          )}
                        >
                          <link.icon className="h-4 w-4" />
                          <span className="sr-only">{link.title}</span>
                        </a>
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
                  <Link key={linkIndex} href={link.href}>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: isActive(link.href) ? 'default' : 'ghost',
                          size: 'sm'
                        }),
                        'flex items-center justify-start'
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
                    </a>
                  </Link>
                )
              )}
            </nav>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
