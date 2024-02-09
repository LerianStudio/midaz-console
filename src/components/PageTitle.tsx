import { cn } from '@/lib/utils'
import { FC } from 'react'

type Props = {
  title: string
  className?: string
}

export const PageTitle: FC<Props> = ({ title, className }) => {
  return <h1 className={cn('text-2xl font-semibold', className)}>{title}</h1>
}
