import type { Metadata } from 'next'
import './globals.css'
import { ScrollBar } from '@/components/ScrollBar'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Skillza — SA\'s Creative Talent Platform',
  description: 'Book SA\'s best young creative talent — photographers, designers, videographers and more. Skillza verified, fairly priced, ready for your next project.',
  keywords: ['student talent', 'South Africa', 'book photographer', 'student services', 'Cape Town', 'UCT', 'AFDA', 'Red and Yellow'],
  authors: [{ name: 'Skillza' }],
  creator: 'Skillza',
  metadataBase: new URL('https://skillza.co.za'),
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://skillza.co.za',
    title: 'Skillza — SA\'s Creative Talent Platform',
    description: 'Book SA\'s best young creative talent — photographers, designers, videographers and more. Skillza verified, fairly priced, ready for your next project.',
    siteName: 'Skillza',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Skillza — SA\'s Creative Talent Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillza — SA\'s Creative Talent Platform',
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
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <ScrollBar />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
