import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/api/auth/[...nextauth]/route'
import React from 'react'
import { Toaster } from 'react-hot-toast'

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
    redirect(`/${locale}/home`)
  }
  return (
    <div>
      <div>{children}</div>
      <Toaster position="top-right" containerStyle={{ top: 60 }} />
    </div>
  )
}

export default AuthRoutes
