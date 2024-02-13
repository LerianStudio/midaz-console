/** @type {import('next').NextConfig} */
const nextConfig = {
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
