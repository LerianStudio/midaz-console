import { Inter } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import { SideNavbar } from '@/components/SideNavBar'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Midaz',
  description: ''
}

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen w-full bg-background text-foreground',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SideNavbar />
          <div className="flex w-full flex-col">
            <Header />
            <div className="w-full p-8">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
