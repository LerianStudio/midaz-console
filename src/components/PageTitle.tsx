import { cn } from '../lib/utils'
import { FC } from 'react'

type Props = {
  title: string
  subtitle?: string
  className?: string
}

export const PageTitle: FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className={cn('text-4xl font-bold', className)}>{title}</h1>
      <p className="text-base font-medium text-[#71717A]">{subtitle}</p>
    </div>
  )
}
