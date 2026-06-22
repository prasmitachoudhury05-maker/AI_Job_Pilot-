import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'

const oswald = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobPilot Engine - AI-Powered Job Search',
  description: 'End-to-end AI-powered job search operating system',
}

import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import LiveBackground from '@/components/layout/LiveBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${oswald.className} bg-black text-amber-50 min-h-screen flex relative`}>
        <LiveBackground />
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 ml-64 p-8 min-h-screen z-10 relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
