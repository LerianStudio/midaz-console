import { redirect, RedirectType } from 'next/navigation'
import '@/app/globals.css'
import { getServerSession } from 'next-auth'
import React from 'react'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'

interface AuthRoutesProps {
  children: React.ReactNode
}

const AuthRoutes = async ({ children }: AuthRoutesProps) => {
  const session = await getServerSession(nextAuthCasdoorOptions)

  if (session?.user) {
    redirect(`/`, RedirectType.replace)
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default AuthRoutes
