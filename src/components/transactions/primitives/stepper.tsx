import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

export const Stepper = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
))
Stepper.displayName = 'Stepper'

export type StepperItemProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean
}

export const StepperItem = forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      data-active={active}
      className={cn('group flex flex-row gap-3', className)}
      {...props}
    />
  )
)
StepperItem.displayName = 'StepperItem'

export const StepperItemNumber = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-shadcn-400 text-sm font-medium text-shadcn-400 group-data-[active=true]:border-none group-data-[active=true]:bg-white group-data-[active=true]:text-neutral-600 group-data-[active=true]:shadow-md',
      className
    )}
    {...props}
  />
))
StepperItemNumber.displayName = 'StepperItemNumber'

export type StepperItemTextProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
}

export const StepperItemText = forwardRef<
  HTMLParagraphElement,
  StepperItemTextProps
>(({ className, title, description, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col text-sm font-medium text-shadcn-400 group-data-[active=true]:text-neutral-600',
      className
    )}
    {...props}
  >
    <div className="flex h-8 items-center">
      <p>{title}</p>
    </div>
    {description && (
      <p className="text-xs group-data-[active=false]:hidden">{description}</p>
    )}
  </div>
))
StepperItemText.displayName = 'StepperItemText'

export type StepperControlProps = PropsWithChildren & {
  active?: boolean
}

export const StepperContent = ({ active, children }: StepperControlProps) => {
  return active ? <>{children}</> : null
}
