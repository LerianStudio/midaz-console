import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/api/auth/[...nextauth]/route'
import React from 'react'

type AuthRoutesProps = {
  children: React.ReactNode,
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
    redirect(`/${locale}/home`)
  }
  return <>{children}</>
}

export default AuthRoutes
