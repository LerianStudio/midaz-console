import React, { Suspense } from 'react'
import '@/globals.css'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Sidebar } from '@/components/Sidebar'
import { getMetadata } from '../../../services/configs/applicationConfig'
import { ThemeProvider } from '@/components/theme-provider'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />

        <div className="w-full p-8">
          {children}
          {/*<Suspense*/}
          {/*  children={children}*/}
          {/*  fallback={<Skeleton className="h-[80px] w-full flex align-middle items-center" />}*/}
          {/*/>*/}
        </div>
      </div>
      <Toaster position="top-right" containerStyle={{ top: 60 }} />
    </div>
    // </ThemeProvider>
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
