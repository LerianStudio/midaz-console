import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { Sidebar } from '@/components/Sidebar'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        <div className="w-full p-8">{children}</div>
      </div>
      <Toaster />
    </div>
  )
}
