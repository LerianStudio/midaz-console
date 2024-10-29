import { redirect, RedirectType } from 'next/navigation'
import '@/app/globals.css'
import { getServerSession } from 'next-auth'
import React from 'react'
import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'

type AuthRoutesProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const AuthRoutes = async ({
  children,
  params: { locale }
}: AuthRoutesProps) => {
  const session = await getServerSession(nextAuthCasdoorOptions)

  if (session?.user) {
    redirect(`/`, RedirectType.replace)
  }
  return <>{children}</>
}

export default AuthRoutes
