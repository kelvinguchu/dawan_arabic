import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { PodcastList } from '@/components/podcasts/PodcastList'
import { Skeleton } from '@/components/ui/skeleton'
import { sharedMetadata } from '@/app/shared-metadata'
import siteConfig from '@/app/shared-metadata'
import ErrorFallback from '@/components/ErrorFallback'
import { getPodcasts } from '@/lib/podcast-actions'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'البودكاست | بوابة أفريقيا - أصوات وقصص صومالية',
  description:
    'استمع إلى بودكاستات شيقة تضم أصواتًا وقصصًا صومالية. نقاشات معمقة حول السياسة والثقافة والأعمال والشؤون الجارية في الصومال.',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'البودكاست | بوابة أفريقيا - أصوات وقصص صومالية',
    description:
      'بودكاستات شيقة تركز على الأصوات والقصص الصومالية - نقاشات حول السياسة والثقافة والأعمال والشؤون الداخلية في الصومال.',
    url: new URL('/podcasts', siteConfig.url).toString(),
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'بوابة أفريقيا - بودكاست وقصص صوتية صومالية',
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'البودكاست | بوابة أفريقيا - أصوات وقصص صومالية',
    description:
      'استمع إلى بودكاستات صومالية تتناول السياسة والثقافة والأعمال والشؤون المحلية في الصومال.',
    images: ['/logo.png'],
  },
  keywords: [
    'بودكاست صومالي',
    'السياسة الصومالية',
    'الثقافة الصومالية',
    'الأعمال في الصومال',
    'أصوات صومالية',
    'قصص صومالية',
    'بوابة أفريقيا',
  ],
  alternates: {
    canonical: new URL('/podcasts', siteConfig.url).toString(),
  },
}

export const revalidate = 60

interface PodcastsPageProps {
  searchParams?: Promise<{
    search?: string
    page?: string
    category?: string
    series?: string
    sort?: string
  }>
}

const PodcastsPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 md:pt-4 md:pb-12 ">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Skeleton className="h-8 w-48 mb-2 rounded" />
        <Skeleton className="h-5 w-96 rounded" />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Skeleton className="h-10 rounded" />
          <Skeleton className="h-10 rounded" />
          <Skeleton className="h-10 rounded" />
          <Skeleton className="h-10 rounded" />
        </div>
        <Skeleton className="h-10 w-full rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function PodcastsPage({ searchParams }: Readonly<PodcastsPageProps>) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const page = parseInt(resolvedSearchParams.page ?? '1', 10)
  const searchTerm = resolvedSearchParams.search ?? ''
  const category = resolvedSearchParams.category ?? 'all'
  const series = resolvedSearchParams.series ?? 'all'
  const sortBy = resolvedSearchParams.sort ?? 'newest'

  try {
    const podcastsData = await getPodcasts({
      page,
      limit: 20,
      searchTerm,
      category,
      series,
      sortBy,
    })

    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <Suspense fallback={<PodcastsPageSkeleton />}>
            <PodcastList
              podcasts={podcastsData.docs}
              title="البودكاست"
              showFilters={true}
              showSearch={true}
              className="w-full"
            />
          </Suspense>

          {podcastsData.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-gray-600">
                Bogga {podcastsData.page} من {podcastsData.totalPages} • {podcastsData.totalDocs}{' '}
                حلقة إجمالاً
              </p>
            </div>
          )}
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error loading podcasts:', error)

    return (
      <main className="bg-gray-50 min-h-screen">
        <ErrorFallback
          title="لا يمكن الوصول إلى البودكاست"
          message="نواجه مشكلة في تحميل محتوى البودكاست. يرجى المحاولة مرة أخرى لاحقًا."
        />
      </main>
    )
  }
}
