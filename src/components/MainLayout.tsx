import { SideNavbar } from './SideNavBar'
import { Header } from './Header'

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <SideNavbar />
      <div className="flex w-full flex-col">
        <Header />
        <div className="w-full p-8">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
