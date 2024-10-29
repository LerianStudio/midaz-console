import { SettingsDropdown } from './settings-dropdown'
import { UserDropdown } from './user-dropdown'
import { Separator } from './ui/separator'

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
