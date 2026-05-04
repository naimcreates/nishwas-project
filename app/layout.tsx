import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'leaflet/dist/leaflet.css'
import './globals.css'
import DashboardLayout from '@/components/nishwas/DashboardLayout'
import { Toaster } from 'sonner'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nishwas – Air Quality & Environmental Dashboard',
  description: 'Real-time air quality monitoring, pollution heatmaps, and environmental insights for your city.',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#0a1a14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
        <Toaster theme="dark" position="top-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
