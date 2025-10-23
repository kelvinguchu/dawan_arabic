import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { BlockchainNewsList } from '@/components/news/BlockchainNewsList'
import { sharedMetadata } from '@/app/shared-metadata'
import siteConfig from '@/app/shared-metadata'
import { CryptoMarkets } from '@/components/markets/CryptoMarkets'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'بلوكتشين | بوابة أفريقيا - أسواق المال والتحليلات في أفريقيا',
  description:
    'تابع أسواق المال في أفريقيا، بيانات في الوقت الفعلي، تحليلات الخبراء ورؤى حول الاقتصاد والأعمال.',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'بلوكتشين | بوابة أفريقيا - أسواق المال والتحليلات في أفريقيا',
    description:
      'تابع أسواق المال في أفريقيا، بيانات في الوقت الفعلي، تحليلات الخبراء ورؤى حول الاقتصاد والأعمال.',
    url: new URL('/blockchain', siteConfig.url).toString(),
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'بوابة أفريقيا - أسواق المال والتحليلات في أفريقيا',
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'بلوكتشين | بوابة أفريقيا - أسواق المال والتحليلات في أفريقيا',
    description:
      'تابع أسواق المال في أفريقيا، بيانات في الوقت الفعلي، تحليلات الخبراء ورؤى حول الاقتصاد والأعمال.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: new URL('/blockchain', siteConfig.url).toString(),
  },
}

export default async function MarketsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const page = Number(sp?.page) || 1
  const sortBy = (sp?.sort as string) || 'market_cap_desc'
  const searchTerm = (sp?.search as string) || ''

  return (
    <main className="bg-gray-50 min-h-screen">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-screen w-full" />
          </div>
        }
      >
        <CryptoMarkets page={page} sortBy={sortBy} searchTerm={searchTerm} />
      </Suspense>
      <BlockchainNewsList limit={8} />
    </main>
  )
}
