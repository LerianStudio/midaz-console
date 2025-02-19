import React from 'react'
import '@/app/globals.css'
import { redirect, RedirectType } from 'next/navigation'
import { SidebarProvider } from '@/components/sidebar/primitive'
import { OrganizationProvider } from '@/context/organization-provider'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-provider'
import { PermissionProvider } from '@/context/permission-provider'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

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
