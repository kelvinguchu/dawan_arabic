import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryPostsList } from '@/components/categories/CategoryPostsList'
import { BlogCategory } from '@/payload-types'
import { FootballLeagueButtons } from '@/components/categories/FootballLeagueButtons'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import siteConfig from '@/app/shared-metadata'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCategory(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'blogCategories',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    return result.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'لم يتم العثور على القسم',
      description: 'القسم المطلوب غير موجود.',
    }
  }

  const ogImageUrl = `${siteConfig.url}/logo.png`

  return {
    title: `${category.name} - أخبار ومقالات`,
    description: `احصل على آخر الأخبار والمقالات في قسم ${category.name}. تابع تغطيتنا الكاملة والتحليلات.`,
    openGraph: {
      title: `${category.name} - أخبار ومقالات`,
      description: `احصل على آخر الأخبار والمقالات في قسم ${category.name}. تابع تغطيتنا الكاملة والتحليلات.`,
      url: new URL(`/categories/${category.slug}`, siteConfig.url).toString(),
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${category.name} - بوابة أفريقيا`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - أخبار ومقالات`,
      description: `احصل على آخر الأخبار والمقالات في قسم ${category.name}. تابع تغطيتنا الكاملة والتحليلات.`,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: new URL(`/categories/${category.slug}`, siteConfig.url).toString(),
    },
  }
}

export default async function CategoryPage({ params }: Readonly<CategoryPageProps>) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const isSportsCategory = category.slug === 'sports' || category.name.toLowerCase() === 'sports'

  return (
    <main className="bg-gray-50 min-h-screen">
      {isSportsCategory && <FootballLeagueButtons />}
      <CategoryPostsList categorySlug={category.slug} categoryName={category.name} />
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'blogCategories',
      limit: 100,
    })

    return (
      result.docs?.map((category: BlogCategory) => ({
        slug: category.slug,
      })) || []
    )
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
