import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedPosts } from '@/components/home/FeaturedPosts'
import { CategorySection } from '@/components/home/CategorySection'
import { HomePageAdSection, HomePageBottomAdSection } from '@/components/home/HomePageAds'
import { Metadata } from 'next'
import { sharedMetadata } from '@/app/shared-metadata'
import siteConfig from '@/app/shared-metadata'
import { getHomePageData } from '@/lib/homepage-actions'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'بوابة أفريقيا - أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'بوابة أفريقيا - أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا',
    description:
      'اكتشف آخر الأخبار والقصص والرؤى من جميع أنحاء الصومال. مصدرك الموثوق للمنظورات الأفريقية حول السياسة والثقافة والأعمال والمزيد.',
    type: 'website',
    url: siteConfig.url,
    siteName: 'بوابة أفريقيا',
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: 'بوابة أفريقيا - أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا',
    description:
      'اكتشف آخر الأخبار والقصص والرؤى من جميع أنحاء الصومال. مصدرك الموثوق للمنظورات الأفريقية حول السياسة والثقافة والأعمال والمزيد.',
    site: '@bawabaafrica',
  },
  alternates: {
    canonical: new URL('/', siteConfig.url).toString(),
  },
}

export const revalidate = 30

export default async function HomePage() {
  const {
    latestPost,
    heroPosts,
    trendingPosts,
    editorsPicks,
    recentNews,
    categoriesWithPosts,
    flashNews,
  } = await getHomePageData()

  return (
    <div className="min-h-screen">
      <HeroSection latestPost={latestPost} recentPosts={heroPosts} flashNews={flashNews} />

      <FeaturedPosts
        trendingPosts={trendingPosts}
        editorsPicks={editorsPicks}
        recentNewsItems={recentNews}
        heroPosts={heroPosts}
      />

      <HomePageAdSection />

      <section className=" bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">أقسام الأخبار</h2>
          <CategorySection categoriesWithPosts={categoriesWithPosts} />
        </div>
      </section>

      <HomePageBottomAdSection />
    </div>
  )
}
