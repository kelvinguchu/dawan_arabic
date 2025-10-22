import React, { Suspense } from 'react'
import '../global.css'
import HeaderServer from '@/components/layout/HeaderServer'
import Footer from '@/components/layout/Footer'

import NewsletterPopup from '@/components/NewsletterPopup'
import { Noto_Sans_Arabic } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { NavigationProvider } from '@/providers/NavigationProvider'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'
import { Loading } from '@/components/global/Loading'
import type { Metadata, Viewport } from 'next'
import { sharedMetadata } from '@/app/shared-metadata'
import siteConfig from '@/app/shared-metadata'
import { GoogleAnalytics } from '@next/third-parties/google'
import { WebVitals } from '@/hooks/useWebVitals'
import { RSSDiscovery } from '@/components/rss'
import Script from 'next/script'
import { PageViewTracker } from '@/components/analytics/GoogleAnalyticsEvents'

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: sharedMetadata.themeColor,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  ...sharedMetadata,
  manifest: '/manifest.json',
  verification: {
    google: '84QZctK6dL25aaWZQeIS4z04cFQTcKGTSnyZmMJzcvk',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
    startupImage: [
      {
        url: '/logo.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/logo.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/logo.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/logo.png',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/logo.png',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': siteConfig.name,
    'apple-mobile-web-app-title': siteConfig.name,
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
    'msapplication-starturl': '/',
  },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'بوابة أفريقيا',
    alternateName: 'بوابة أفريقيا News',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: 'أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا',
    sameAs: [
      'https://x.com/dawan_tv',
      'https://www.facebook.com/Dawantv/',
      'https://www.youtube.com/channel/UCI0ALvkEN9VQwbvmIMHcbvQ',
      'https://www.tiktok.com/@dawan_tv',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'تحريري',
      email: 'Info@bawaba.africa',
      telephone: '+252628881171',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marinio Rd',
      addressLocality: 'Mogadishu',
      addressCountry: 'Somalia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'بوابة أفريقيا',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'بوابة أفريقيا',
    alternateName: 'بوابة أفريقيا News',
    url: siteConfig.url,
    description: 'أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا',
    publisher: {
      '@type': 'Organization',
      name: 'بوابة أفريقيا',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/news?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Site Navigation structured data for better sitelinks
  const navigationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'دليل بوابة أفريقيا',
    url: siteConfig.url,
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'اخبار',
        description: 'آخر الأخبار والتطورات',
        url: `${siteConfig.url}/categories/اخبار`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'مقالات',
        description: 'مقالات وتحليلات معمقة',
        url: `${siteConfig.url}/categories/مقالات`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'التحليلات',
        description: 'تحليلات الخبراء حول القضايا الراهنة',
        url: `${siteConfig.url}/categories/التحليلات`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'تقارير المجتمع',
        description: 'تقارير خاصة من المجتمع',
        url: `${siteConfig.url}/categories/تقارير-المجتمع`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'من نحن',
        description: 'تعرف على فريقنا ومهمتنا',
        url: `${siteConfig.url}/about`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'اتصل بنا',
        description: 'تواصل معنا للاستفسارات',
        url: `${siteConfig.url}/contact`,
      },
    ],
  }

  // Breadcrumb List for homepage
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الصفحة الرئيسية',
        item: siteConfig.url,
      },
    ],
  }

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`scroll-smooth ${notoSansArabic.className}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#2ac4f3" />

        {/* RSS Feed Discovery */}
        <RSSDiscovery />

        {/* Funding Choices (Consent) */}
        <Script
          id="funding-choices"
          strategy="beforeInteractive"
          src="https://fundingchoicesmessages.google.com/i/pub-5247780644977108?ers=1"
        />
        <Script
          id="funding-choices-present"
          strategy="beforeInteractive"
        >{`(function(){function signalGooglefcPresent(){try{if(!window.frames['googlefcPresent']){if(document.body){var iframe=document.createElement('iframe');iframe.style.cssText='display:none';iframe.name='googlefcPresent';document.body.appendChild(iframe);}else{setTimeout(signalGooglefcPresent,0);}}}catch(e){}}signalGooglefcPresent();})();`}</Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, '\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(navigationStructuredData).replace(/</g, '\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, '\u003c'),
          }}
        />
      </head>
      <body className={cn('font-sans', 'min-h-screen flex flex-col bg-gray-50')}>
        <WebVitals />
        <Suspense fallback={<Loading fullScreen={true} message="جاري التحميل..." />}>
          <PageViewTracker />
          <AuthProvider>
            <QueryProvider>
              <NavigationProvider>
                <Toaster richColors position="top-right" />
                <HeaderServer />
                <main className="grow">{children}</main>
                <Footer />
                <NewsletterPopup delay={5000} />
              </NavigationProvider>
            </QueryProvider>
          </AuthProvider>
        </Suspense>

        {/* AdSense */}
        <Script
          async
          data-no-optimize="true"
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5247780644977108"
          crossOrigin="anonymous"
        />

        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('تم تسجيل Service Worker بنجاح');
                    },
                    function(err) {
                      console.log('فشل تسجيل Service Worker: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
