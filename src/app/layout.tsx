import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/config';
import { GoogleAnalytics } from '@/components/google-analytics';
import { GoogleAnalyticsConsentSync } from '@/components/google-analytics-consent-sync';
import { GoogleAdSense } from '@/components/google-adsense';
import { SiteEventTracker } from '@/components/site-event-tracker';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalyticsConsentSync />
        <SiteEventTracker />
        <GoogleAdSense />
        <NavHeader />
        <main id="main-content" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
