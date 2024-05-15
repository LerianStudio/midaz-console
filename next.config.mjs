import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  env: {
    MIDAZ_CONSOLE_BASE_PATH: process.env.MIDAZ_CONSOLE_BASE_PATH,
    MIDAZ_SERVER_BASE_PATH: process.env.MIDAZ_SERVER_BASE_PATH,
    ORY_KRATOS_PUBLIC_URL: process.env.ORY_KRATOS_PUBLIC_URL
  }
}

export default withNextIntl(nextConfig)
