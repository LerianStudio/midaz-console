import React from 'react'
import '@/globals.css'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Sidebar } from '@/components/Sidebar'
import { getMetadata } from '../../../services/configs/applicationConfig'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <div className="w-full p-8">{children}</div>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
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
