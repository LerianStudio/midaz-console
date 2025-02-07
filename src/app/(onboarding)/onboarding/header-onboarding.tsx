import Image from 'next/image'
import MidazLogo from '@/svg/midaz-logo-white.svg'

export const Header = () => {
  return (
    <div className="flex h-[60px] w-full items-center justify-center border-b bg-white">
      <nav className="flex w-full max-w-[1090px] items-center gap-4">
        <Image src={MidazLogo} alt="Rocket" height={40} width={40} />
        <div className="flex text-base text-zinc-800">Midaz Console</div>
      </nav>
    </div>
  )
}
