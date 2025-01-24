import DayjsProvider from '@/providers/dayjs-provider'
import React from 'react'

export default function TransactionsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <DayjsProvider>{children}</DayjsProvider>
}
