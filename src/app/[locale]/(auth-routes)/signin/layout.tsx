import { redirect, RedirectType } from 'next/navigation'
import '@/app/globals.css'
import { getServerSession } from 'next-auth'
import React from 'react'
import { nextAuthOptions } from '@/utils/OryCredentialsProvider'

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
  const session = await getServerSession(nextAuthOptions)

  if (session?.user) {
    redirect(`/${locale}/`, RedirectType.replace)
  }
  return <>{children}</>
}

export default AuthRoutes
