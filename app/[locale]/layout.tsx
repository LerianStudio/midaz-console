import { NextIntlClientProvider, useMessages } from 'next-intl'
import '@/globals.css'
import { QueryProvider } from '@/utils/queryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
      <div>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      
      </div>
  )
}
