'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SideNavbar } from '@/components/SideNavBar'
import { Header } from '@/components/Header'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { metadata } from './metadata'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathName = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (pathName === '/') {
      const defaultLocale = 'pt_BR'
      router.push(`/?lang=${defaultLocale}`)
      setLoading(true)
    }

    document.title = metadata.title
  }, [pathName, router])

  return (
    <html lang="pt_BR">
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
          {loading && (
            <Suspense fallback={<p>Loading...</p>}>
              <SideNavbar />
              <div className="flex w-full flex-col">
                <Header />
                <div className="w-full p-8">{children}</div>
              </div>
            </Suspense>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
