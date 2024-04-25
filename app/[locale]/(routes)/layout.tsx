import React, { Suspense } from 'react'
import '@/globals.css'
import { Header } from '@/components/Header'
import { Metadata } from 'next'
import { Sidebar } from '@/components/Sidebar'
import { getMetadata } from '../../../services/configs/applicationConfig'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/api/auth/[...nextauth]/route'
import { redirect, RedirectType } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default async function RootLayout({
                                           children,
                                           params: { locale }
                                         }: {
  children: React.ReactNode
  params: { locale: string }
}) {
  
  const session = await getServerSession(nextAuthOptions)
  
  if (!session?.user) {
    redirect(`/${locale}/signin`, RedirectType.push)
  }
  
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        
        <div className="w-full p-8">
          {children}
        </div>
      </div>
      <Toaster position="top-right" containerStyle={{ top: 60 }} />
    </div>
  )
}

export async function generateMetadata(props: {}): Promise<Metadata> {
  const { title, icons, description } = await getMetadata()

  return {
    title: title,
    icons: icons,
    description: description,
    ...props
  }
}
