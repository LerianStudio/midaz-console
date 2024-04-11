import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning >{children}</body>
    </html>
  )
}
