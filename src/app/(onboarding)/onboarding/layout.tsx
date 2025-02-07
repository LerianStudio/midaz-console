import React from 'react'
import '@/app/globals.css'
import { redirect, RedirectType } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'
import { Header } from './header-onboarding'

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
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}
