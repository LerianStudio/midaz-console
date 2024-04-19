import { ReactNode } from 'react'

interface BaseMenuEntry {
  type?: string
  action?: () => void
  icon?: ReactNode
  label?: string
}

export type MenuEntry = BaseMenuEntry
