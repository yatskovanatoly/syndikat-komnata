import { DOMAIN } from '@/middleware'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/komnata/:path*',
        destination: getDestination('komnata'),
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: origin },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, RSC, Next-Router-Prefetch, Next-Router-State-Tree',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
}

const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
const getDestination = (path: string) => `${protocol}${path}.${DOMAIN}`
const origin = `${protocol}${DOMAIN}`

export default nextConfig
