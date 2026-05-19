import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import NavigationProgress from '@/components/NavigationProgress'
import ToasterProvider from '@/components/ToasterProvider'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300','400','500','600','700','800','900'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400','500'],
})

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://vexenlabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Vexen Labs — Own Your Software. Forever.',
    template: '%s | Vexen Labs',
  },
  description: 'Vexen Labs builds powerful offline-first desktop software for schools, clinics, medical stores, and businesses worldwide. One-time purchase. Lifetime license. No subscriptions.',
  keywords: ['school management software','clinic software','medical store ERP','desktop software','offline ERP','lifetime license software'],
  authors: [{ name: 'Vexen Labs', url: SITE }],
  creator: 'Vexen Labs',
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE, siteName: 'Vexen Labs',
    title: 'Vexen Labs — Own Your Software. Forever.',
    description: 'Powerful offline-first desktop software. One-time purchase. No subscriptions.',
  },
  twitter: { card: 'summary_large_image', creator: '@VexenLabs' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#04040A', colorScheme: 'dark',
  width: 'device-width', initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${outfit.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'var(--font-body)', background: 'var(--bg)', color: 'var(--text-1)' }} suppressHydrationWarning>
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
        <ToasterProvider />
      </body>
    </html>
  )
}
