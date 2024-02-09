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

interface NavProps {
  isCollapsed: boolean
  categories: Category[]
}

export const Nav: FC<NavProps> = ({ categories, isCollapsed }) => {
  const pathName = usePathname()

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {!isCollapsed && category.name && (
              <div className="my-2 px-2 font-bold">{category.name}</div>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              {category.links.map((link, linkIndex) =>
                isCollapsed ? (
                  <Tooltip key={linkIndex} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          buttonVariants({
                            variant:
                              link.href === pathName ? 'default' : 'ghost',
                            size: 'icon'
                          }),
                          'h-9 w-9',
                          link.variant === 'default' &&
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
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
                        variant: link.href === pathName ? 'default' : 'ghost',
                        size: 'sm'
                      }),
                      link.variant === 'default' &&
                        'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                      'justify-start'
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
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
