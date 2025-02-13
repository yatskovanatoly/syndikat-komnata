import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-2 h-[100dvh]`}
      >
        {children}
      </body>
    </html>
  )
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "московский музыкальный синдикат",
  // openGraph: {
  //   type: "website",
  //   title: "московский музыкальный синдикат",
  //   siteName: "московский музыкальный синдикат",
  //   images: [{
  //     url: "https://example.com/og.png",
  //   }],
  // }
}
