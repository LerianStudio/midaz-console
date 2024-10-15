import React from 'react'
import '@/app/globals.css'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/sidebar/primitive'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar />
        <div className="flex min-h-full w-full flex-col bg-shadcn-100">
          <Header />

          <div className="h-full w-full px-16 pb-16 pt-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
