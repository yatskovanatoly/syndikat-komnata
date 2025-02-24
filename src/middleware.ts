import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
export const DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env?.LOCALHOST

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // Allow public files and Next.js assets
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return

  const host = req.headers.get('host')
  const subdomain = getValidSubdomain(host)
  if (subdomain && host) {
    url.pathname = `/${subdomain}${url.pathname}`
  }

  // Handle CORS
  const response = NextResponse.rewrite(url)
  setCorsHeaders(response, req)

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  return response
}

// Extract subdomain from the host
const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null
  if (!host && typeof window !== 'undefined') {
    host = window.location.host
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0]

    if (host === DOMAIN) return
    if (candidate && !candidate.includes('localhost')) {
      subdomain = candidate
    }
  }
  return subdomain
}

// Set CORS headers
const setCorsHeaders = (response: NextResponse, req: NextRequest) => {
  const origin = req.headers.get('origin')
  if (
    origin &&
    (origin.endsWith(`.${DOMAIN}`) || origin === `https://${DOMAIN}`)
  ) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, RSC'
    )
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
}
