import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'komnata.syndikat.moscow',
          },
        ],
        destination: '/komnata/:path*',
      },
    ]
  },
}

export default nextConfig
