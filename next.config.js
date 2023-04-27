/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/club',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
