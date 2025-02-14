import React from 'react'
import '@/app/globals.css'
import { redirect, RedirectType } from 'next/navigation'
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
        <SidebarProvider>{children}</SidebarProvider>
      </PermissionProvider>
    </OrganizationProvider>
  )
}
