import type { Metadata } from 'next'
import './globals.css'
import { ScrollBar } from '@/components/ScrollBar'

export const metadata: Metadata = {
  title: 'Skillza — SA\'s Student Talent Marketplace',
  description: 'Book verified South African student talent. Photographers, designers, videographers, chefs, DJs and more — trained at SA\'s top creative schools.',
  keywords: ['student talent', 'South Africa', 'book photographer', 'student services', 'Cape Town', 'UCT', 'AFDA', 'Red and Yellow'],
  authors: [{ name: 'Skillza' }],
  creator: 'Skillza',
  metadataBase: new URL('https://skillza.co.za'),
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://skillza.co.za',
    title: 'Skillza — SA\'s Student Talent Marketplace',
    description: 'Agency quality. Student prices. SA verified. Book photographers, designers, videographers and more — all student card verified.',
    siteName: 'Skillza',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Skillza — SA\'s Student Talent Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillza — SA\'s Student Talent Marketplace',
    description: 'Agency quality. Student prices. SA verified.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA">
      <body>
        <ScrollBar />
        {children}
      </body>
    </html>
  )
}
