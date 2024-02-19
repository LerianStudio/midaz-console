/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/overview',
        permanent: true
      }
    ]
  }
}

export default nextConfig
