import type { Metadata, Viewport } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : 'https://northstar.example'),
  title: 'HVAC Repair & Heating Services in Dallas–Fort Worth | Northstar Heating & Air',
  description: 'Reliable HVAC repair, AC installation, heating, maintenance, and emergency service across Dallas–Fort Worth. Schedule service with Northstar Heating & Air.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Your home should feel right. | Northstar Heating & Air',
    description: 'A premium HVAC website concept. Comfort, when you need it most. Dallas–Fort Worth, Texas.',
    type: 'website',
    images: [{ url: '/images/comfort-home.png', width: 1024, height: 1024, alt: 'A comfortable North Texas home' }],
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f6f4ee', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${dmSans.variable} ${manrope.variable}`}><body className="font-sans antialiased">{children}</body></html>
}
