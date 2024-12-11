import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

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
      className={cn('group flex flex-row items-center gap-3', className)}
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
      'flex h-8 w-8 items-center justify-center rounded-full border border-shadcn-400 text-sm font-medium text-shadcn-400 group-data-[active]:border-none group-data-[active]:bg-white group-data-[active]:text-neutral-600 group-data-[active]:shadow-md',
      className
    )}
    {...props}
  />
))
StepperItemNumber.displayName = 'StepperItemNumber'

export const StepperItemText = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm font-medium text-shadcn-400 group-data-[active]:text-neutral-600',
      className
    )}
    {...props}
  />
))
StepperItemText.displayName = 'StepperItemText'
