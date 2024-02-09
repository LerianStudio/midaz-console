import { LucideIcon } from 'lucide-react'

export type Link = {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  href: string
}

export type Category = {
  name?: string
  links: Link[]
}
