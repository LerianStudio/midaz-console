import React from 'react'
import '@/app/globals.css'
import { redirect, RedirectType } from 'next/navigation'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/sidebar/primitive'
import { OrganizationProvider } from '@/context/organization-provider'
import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'
import { PermissionProvider } from '@/context/permission-provider'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthCasdoorOptions)

  if (!session) {
    redirect(`/signin`, RedirectType.replace)
  }

  return (
    <OrganizationProvider>
      <PermissionProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background text-foreground">
            <Sidebar />
            <div className="flex min-h-full w-full flex-col bg-shadcn-100">
              <Header />

              <div className="h-full w-full px-16 pb-16 pt-6">{children}</div>
            </div>
          </div>
        </SidebarProvider>
      </PermissionProvider>
    </OrganizationProvider>
  )
}
