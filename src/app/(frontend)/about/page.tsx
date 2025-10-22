import React from 'react'
import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutContent } from '@/components/about/AboutContent'
import { OurPlatforms } from '@/components/about/OurPlatforms'

export const metadata: Metadata = {
  title: 'من نحن - مجموعة دوان الإعلامية',
  description:
    'تعرف على مجموعة دوان الإعلامية - شركة إعلامية ديناميكية تأسست عام 2023، تركز على الصومال والقرن الأفريقي، وتقدم الأخبار والتحليلات والقصص الثقافية.',
  openGraph: {
    title: 'من نحن - مجموعة دوان الإعلامية',
    description:
      'مهمتنا هي إعلام وإشراك وربط المجتمعات في الصومال والقرن الأفريقي.',
    type: 'website',
    locale: 'ar_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'من نحن - مجموعة دوان الإعلامية',
    description:
      'تعرف على رؤيتنا ومهمتنا لخدمة مجتمع الصومال والقرن الأفريقي.',
  },
  keywords: [
    'بوابة أفريقيا',
    'مجموعة دوان الإعلامية',
    'أخبار الصومال',
    'القرن الأفريقي',
    'الصحافة الأفريقية',
    'آراء',
    'تقارير',
    'برامج حالية',
  ],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />

      <AboutContent />

      <OurPlatforms />
    </div>
  )
}
