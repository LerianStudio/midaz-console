import { SettingsDropdown } from '../settings-dropdown'
import { UserDropdown } from '../user-dropdown'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import MidazLogo from '@/svg/midaz-logo-white.svg'

export const Header = () => {
  return (
    <div className="flex h-[60px] w-full items-center border-b bg-white py-5 pr-16">
      <nav className="flex w-full items-center justify-end gap-4">
        <p className="mr-4 text-xs font-medium text-shadcn-400">
          Midaz Console v.0.1
        </p>
        <Separator orientation="vertical" className="h-10" />
        <div className="flex gap-6 pl-2">
          <SettingsDropdown />
          <UserDropdown />
        </div>
      </nav>
    </div>
  )
}

export const StaticHeader = () => {
  return (
    <div className="flex h-[60px] w-full items-center justify-center border-b bg-white">
      <nav className="flex w-full max-w-[1090px] items-center gap-4">
        <Image src={MidazLogo} alt="Logo" height={40} width={40} />
        <div className="flex text-base text-zinc-800">Midaz Console</div>
      </nav>
    </div>
  )
}
