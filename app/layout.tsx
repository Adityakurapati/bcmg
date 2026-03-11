import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://votingslipbcmg.in'),

  title: {
    default: 'BCMG Elections 2026 Voting Slip',
    template: '%s | BCMG Elections',
  },

  description:
    'Find your official voting slip for Bar Council of Maharashtra & Goa Elections 2026. Search by name or enrollment number and download instantly.',

  applicationName: 'BCMG Voting Slip',

  keywords: [
    'BCMG Elections',
    'Bar Council Maharashtra Goa',
    'Voting Slip',
    'Lawyer Elections',
    'Bar Council Voting',
    'BCMG 2026'
  ],

  authors: [
    { name: 'BCMG Elections' }
  ],

  creator: 'BCMG Elections',
  publisher: 'BCMG Elections',

  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/favicon.ico' }
    ],
    apple: '/logo.png',
  },

  openGraph: {
    title: 'BCMG Elections 2026 Voting Slip',
    description:
      'Search and download your official voting slip for Bar Council of Maharashtra & Goa Elections 2026.',
    url: 'https://votingslipbcmg.in',
    siteName: 'BCMG Voting Slip',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'BCMG Elections 2026 Voting Slip',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BCMG Elections 2026 Voting Slip',
    description:
      'Search and download your official voting slip for Bar Council of Maharashtra & Goa Elections 2026.',
    images: ['/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
