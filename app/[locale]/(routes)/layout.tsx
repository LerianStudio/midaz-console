import { Inter } from 'next/font/google'
import '@/globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'
import { getMetadata } from '../../../services/configs/applicationConfig'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
  prefixTitle?: string
  title: string
}

export default RootLayout

function RootLayout({
                      children,
                      params: { locale }
                    }: Readonly<RootLayoutProps>) {
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

export async function generateMetadata(props: {}): Promise<Metadata> {
  const { title, icons, description } = await getMetadata()

  return {
    title: title,
    icons: icons,
    description: description,
    ...props
  }
}

