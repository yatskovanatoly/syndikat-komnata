import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'эта комната • московский музыкальный синдикат',
  description: 'спектакль-сказка о поиске дома',
  openGraph: {
    title: 'эта комната • московский музыкальный синдикат',
    description: 'спектакль-сказка о поиске дома',
    url: 'https://komnata.syndikat.moscow',
    type: 'website',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/46fb5671-9c66-4a61-b9b9-4c17e74683a4.png?token=SulmU6NZKEj92F7uB6JirqB5O3C84_NQw45veuJSCvQ&height=630&width=1200&expires=33277632940',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'эта комната • московский музыкальный синдикат',
    description: 'спектакль-сказка о поиске дома',
    images: [
      'https://opengraph.b-cdn.net/production/images/46fb5671-9c66-4a61-b9b9-4c17e74683a4.png?token=SulmU6NZKEj92F7uB6JirqB5O3C84_NQw45veuJSCvQ&height=630&width=1200&expires=33277632940',
    ],
  },
}
