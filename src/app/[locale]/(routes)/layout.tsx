import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Midaz',
  description: ''
}

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen w-full bg-background text-foreground',
          inter.className
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Sidebar />
          <div className="flex w-full flex-col">
            <Header />
            <div className="w-full p-8">{children}</div>
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
