import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://swiftshopr.shop';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SwiftShopr — Skip the line. Scan. Pay. Go.',
    template: '%s · SwiftShopr',
  },
  description:
    'AI-powered checkout for modern retail. Scan items with your phone, pay instantly via Stripe, and walk out the door.',
  keywords: [
    'SwiftShopr',
    'scan and go',
    'mobile checkout',
    'AI shopping assistant',
    'retail payments',
    'Stripe',
    'cashback rewards',
  ],
  authors: [{ name: 'SwiftShopr Inc.' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'SwiftShopr — Skip the line. Scan. Pay. Go.',
    description:
      'AI-powered checkout for modern retail. Scan, pay, walk out.',
    siteName: 'SwiftShopr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftShopr — Skip the line. Scan. Pay. Go.',
    description:
      'AI-powered checkout for modern retail. Scan, pay, walk out.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
