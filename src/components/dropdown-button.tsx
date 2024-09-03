'use client'

import { MenuEntry } from '@/core/repositories/menu-entry'
import { ChevronDown } from 'lucide-react'
import Dropdown from './dropdown'

type Props = {
  buttonText: string
  buttonItems: MenuEntry[]
}

const DropdownButton = ({ buttonText, buttonItems }: Props) => {
  const trigger = (
    <div className="relative flex items-center justify-center rounded-md bg-deYork-600 text-sm font-medium text-white focus:outline-none">
      <p className="px-4">{buttonText}</p>

      <span className="border-l border-black/15 p-2">
        <ChevronDown size={24} />
      </span>
    </div>
  )

  return (
    <Dropdown trigger={trigger} menuItems={buttonItems} className="w-auto" />
  )
}

export default DropdownButton
