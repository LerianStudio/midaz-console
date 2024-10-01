import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PopoverTrigger } from '../ui/popover'
import { ChevronDown } from 'lucide-react'

type LogoProps = {
  image: string
  alt: string
  orgName: string
  active?: boolean
  collapsed?: boolean
  button?: boolean
}

const Logo = ({
  image,
  alt,
  orgName,
  active,
  collapsed,
  button
}: LogoProps) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-3',
        button && 'cursor-pointer'
      )}
    >
      <Image
        src={image}
        alt={alt}
        height={40}
        width={40}
        className={cn(
          button &&
            'box-border rounded-lg border-[3px] p-[1px] group-hover:border-shadcn-300',
          active && 'border-shadcn-400 group-hover:border-shadcn-400'
        )}
      />

      {!collapsed && (
        <h1
          className={cn(
            'text-sm font-medium capitalize text-shadcn-600',
            active && 'text-shadcn-400'
          )}
        >
          {orgName}
        </h1>
      )}

      {!collapsed && (
        <ChevronDown
          className={cn(active && 'rotate-180 text-shadcn-400')}
          size={16}
        />
      )}
    </div>
  )
}

export type SwitcherTriggerProps = Omit<LogoProps, 'active'> & {
  open: boolean
  disabled?: boolean
}

export const SwitcherTrigger = ({
  open,
  disabled,
  ...others
}: SwitcherTriggerProps) => {
  if (disabled) {
    return <Logo {...others} />
  }

  return (
    <PopoverTrigger>
      <Logo button active={open} {...others} />
    </PopoverTrigger>
  )
}
