'use client'

import { NextIntlClientProvider } from 'next-intl'

/**
 * TODO: Should be deprecated and removed soon
 * @param param0
 * @returns
 */
export default function MyCustomNextIntlClientProvider({
  children,
  locale,
  timeZone,
  now,
  ...rest
}: any) {
  return (
    <NextIntlClientProvider
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>
      }}
      locale={locale}
      timeZone={timeZone}
      now={now}
      {...rest}
    >
      {children}
    </NextIntlClientProvider>
  )
}
