import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import '@/app/globals.css'
import { QueryProvider } from '@/utils/query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import { getMetadata } from '../../../services/configs/application-config'
import { getMessages } from 'next-intl/server'
import { LocalizationProvider } from '@/lib/intl'

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <div>
      <QueryProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocalizationProvider>
            <div>{children}</div>
            <Toaster
              position="top-right"
              containerStyle={{ top: 60, right: 60 }}
            />
          </LocalizationProvider>
        </NextIntlClientProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
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
