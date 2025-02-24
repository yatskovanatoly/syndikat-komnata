import { DOMAIN } from '@/middleware'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/komnata',
        destination: getDestination('komnata'),
        permanent: true,
      },
    ]
  },
}

const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
const getDestination = (path: string) => `${protocol}${path}.${DOMAIN}`

export default nextConfig
