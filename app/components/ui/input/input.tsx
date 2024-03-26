import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-[#C7C7C7] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none',
          {
            'cursor-not-allowed': props.readOnly,
            'disabled:cursor-not-allowed disabled:opacity-50': props.disabled
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
