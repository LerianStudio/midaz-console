import { hostname } from 'os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  env: {
    MIDAZ_CONSOLE_BASE_PATH: process.env.MIDAZ_CONSOLE_BASE_PATH,
    MIDAZ_SERVER_BASE_PATH: process.env.MIDAZ_SERVER_BASE_PATH
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.MIDAZ_CONSOLE_SERVICE_HOST || 'localhost',
        pathname: '**'
      }
    ]
  },
  compiler: {
    reactRemoveProperties:
      process.env.NODE_ENV === 'production'
        ? { properties: ['^data-testid$'] }
        : false
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      worker_threads: false,
      pino: false
    }

    return config
  },
  experimental: {
    serverComponentsExternalPackages: [
      'pino',
      'pino-pretty',
      '@opentelemetry/instrumentation'
    ],
    instrumentationHook: true
  }
}

export default nextConfig
