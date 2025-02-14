import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

type OnboardTitleProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  subtitle?: string
}

export const OnboardTitle = forwardRef<HTMLDivElement, OnboardTitleProps>(
  ({ className, title, subtitle, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {subtitle && (
        <p className="text-sm font-normal text-shadcn-400">{subtitle}</p>
      )}
      <h1>{title}</h1>
    </div>
  )
)
OnboardTitle.displayName = 'OnboardTitle'
