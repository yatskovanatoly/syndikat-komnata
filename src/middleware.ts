import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
export const DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env?.LOCALHOST

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return

  const host = req.headers.get('host')
  const subdomain = getValidSubdomain(host)
  if (subdomain && host) {
    url.pathname = `/${subdomain}${url.pathname}`
  }

  return NextResponse.rewrite(url)
}

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
