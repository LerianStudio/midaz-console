import { NextIntlClientProvider, useMessages } from 'next-intl'
import '@/globals.css'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/utils/queryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
