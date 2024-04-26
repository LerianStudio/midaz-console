import React, { ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from './ui/dropdown-menu'
import { MenuEntry } from '@/repositories/MenuEntry'

interface DropdownProps {
  trigger: ReactNode
  menuItems: MenuEntry[]
  menuLabel: string
  menuIcon?: ReactNode
}

const Dropdown = ({
  trigger,
  menuItems,
  menuLabel,
  menuIcon
}: DropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-[60px] items-center justify-center outline-none">
      {trigger}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-[241px] rounded-lg">
      <div className="flex items-center gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-shadcn-100">
        {menuIcon && <span>{menuIcon}</span>}
        <DropdownMenuLabel className="p-0 text-sm font-bold text-[#52525b]">
          {menuLabel}
        </DropdownMenuLabel>
      </div>

      {menuItems.map((item: MenuEntry, index: number) => {
        if (item.type === 'separator') {
          return (
            <DropdownMenuSeparator
              key={`separator-${index}`}
              className="bg-shadcn-200"
            />
          )
        }

        return (
          <DropdownMenuItem
            key={index}
            onSelect={item.action}
            className="flex items-center gap-3 px-3 py-2 focus:bg-shadcn-100"
          >
            {item.icon && <span className="text-shadcn-400">{item.icon}</span>}
            <p className="text-sm font-medium text-[#52525b]">{item.label}</p>
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default Dropdown
