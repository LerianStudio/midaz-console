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
    MIDAZ_BASE_PATH: process.env.MIDAZ_BASE_PATH,
    MIDAZ_CONSOLE_BASE_PATH: process.env.MIDAZ_CONSOLE_BASE_PATH
  },
}

export default withNextIntl(nextConfig)
