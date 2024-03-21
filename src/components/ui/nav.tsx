import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { buttonVariants } from './button'
import { cn } from '@/lib/utils'
import { Category } from '@/types/SidebarType'
import LeriandLogo from '../../../public/images/leriand-logo.png'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link } from '@/navigation'

interface NavProps {
  isCollapsed: boolean
  categories: Category[]
}

export const Nav = ({ categories, isCollapsed }: NavProps) => {
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
        className="group flex flex-col gap-4 pt-4 data-[collapsed=false]:min-w-[212px] data-[collapsed=true]:py-2 data-[collapsed=true]:pt-4"
      >
        {isCollapsed && (
          <div className="flex justify-center">
            <Image
              src={LeriandLogo}
              alt="Leriand Logo"
              height={37}
              width={37}
            />
          </div>
        )}

        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {!isCollapsed && category.name && (
              <div className="my-2 px-2">
                <p className="text-xs font-medium uppercase text-[#585B5F] text-foreground">
                  {category.name}
                </p>
              </div>
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
                            variant: isActive(link.href) ? 'white' : 'ghost',
                            size: 'icon'
                          }),
                          'flex h-9 w-9 items-center justify-center'
                        )}
                      >
                        <link.icon className="h-5 w-5" />
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
                        variant: isActive(link.href) ? 'white' : 'ghost',
                        size: 'sm'
                      }),
                      'flex items-center justify-start'
                    )}
                  >
                    <link.icon className="mr-2 h-5 w-5" />
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
