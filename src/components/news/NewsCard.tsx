'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost as ImportedBlogPost } from '@/payload-types'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getPostImageFromLayout, getPostExcerpt, getLocalizedField } from '@/utils/postUtils'
import { formatTimeAgo } from '@/utils/dateUtils'
import { BlogCategory } from '@/payload-types'

interface NewsCardProps {
  post: ImportedBlogPost
  showCategories?: boolean
}

// Calculate estimated reading time
const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

const isPopulatedCategory = (category: string | BlogCategory): category is BlogCategory => {
  return typeof category === 'object' && category !== null && 'id' in category
}

export const NewsCard: React.FC<NewsCardProps> = ({ post, showCategories = true }) => {
  const imageUrl = getPostImageFromLayout(post.layout)
  const excerpt = getPostExcerpt(post, { maxLength: 150, prioritizeCoverSubheading: false })
  const timeAgo = formatTimeAgo(post.createdAt)
  const categories = post.categories

  // Calculate reading time from excerpt
  const readingTime = calculateReadingTime(excerpt || getLocalizedField(post.name, ''))

  // Get primary category for display
  const primaryCategory =
    categories && categories.length > 0 && isPopulatedCategory(categories[0])
      ? getLocalizedField(categories[0].name, '')
      : '';

  const postName = getLocalizedField(post.name, '')
  const postSlug = getLocalizedField(post.slug, '')

  return (
    <article className="group shadow-md relative flex flex-col h-full overflow-hidden rounded-xl bg-white transition-all duration-500 hover:translate-y-[-4px]">
      <Link
        href={`/news/${postSlug}`}
        className="block h-full"
        aria-label={`اقرأ المقال: ${postName}`}
        data-article-id={post.id}
        data-article-slug={postSlug}
      >
        {/* Card top accent line */}
        <div
          className="absolute top-0 bg-primary left-0 right-0 h-1 z-10 opacity-80 group-hover:opacity-100 transition-opacity"
        />

        {/* Main card container with subtle shadow that intensifies on hover */}
        <div className="flex flex-col h-full shadow-sm group-hover:shadow-xl transition-shadow duration-500">
          {/* Image section with gradient overlay */}
          <div className="relative aspect-16/10 w-full overflow-hidden">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={postName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </>
            ) : (
              <div
                className="h-full w-full flex items-center justify-center shadow-md shadow-primary bg-linear-to-br from-primary/10 to-primary/5"
              >
                <span className="text-base font-medium opacity-60 text-primary">
                  {primaryCategory ?? 'مقال أخبار'}
                </span>
              </div>
            )}

            {/* Category pill - positioned in top right */}
            {showCategories && primaryCategory && (
              <div className="absolute top-3 right-3 z-10">
                <div
                  className="px-2.5 py-1 rounded-full text-sm bg-primary font-medium tracking-wide text-white shadow-md"
                >
                  {primaryCategory}
                </div>
              </div>
            )}

            {/* Reading time indicator */}
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-sm flex-row-reverse">
                <BookOpen className="h-3 w-3" />
                <span>{readingTime} دقائق قراءة</span>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="flex flex-col grow p-5">
            {/* Article metadata with date only */}
            <div className="flex items-center text-sm text-gray-500 mb-3 flex-row-reverse justify-end">
              <span className="flex items-center flex-row-reverse">
                <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
                {timeAgo}
              </span>
            </div>

            {/* Title with simple hover effect */}
            <h3 className="font-sans text-lg leading-tight text-gray-900 group-hover:text-primary text-right transition-colors">
              {postName}
            </h3>

            {excerpt && (
              <p className="font-sans text-base text-gray-600 line-clamp-3 mb-2 leading-relaxed text-right">
                {excerpt}
              </p>
            )}

            {/* Spacer to push the footer to the bottom */}
            <div className="grow" />

            {/* Card footer with additional categories and read more link */}
            <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between flex-row-reverse">
              {/* Additional categories as subtle badges */}
              <div className="flex flex-wrap gap-1.5">
                {showCategories &&
                  categories &&
                  Array.isArray(categories) &&
                  categories.length > 1 &&
                  categories.slice(1, 3).map((category) =>
                    typeof category === 'object' && category.name ? (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className="text-sm font-normal px-1.5 py-0 border-primary/40 text-primary"
                      >
                        {getLocalizedField(category.name, '')}
                      </Badge>
                    ) : null,
                  )}
              </div>

              {/* Read more indicator with animated arrow */}
              <div
                className="flex items-center text-base font-medium transition-colors group-hover:text-slate-900 flex-row-reverse text-primary"
              >
                <span className="mr-1">اقرأ المقال</span>
                <span className="relative overflow-hidden inline-block w-4 h-4">
                  <ArrowUpRight className="h-4 w-4 absolute transform transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[-4px]" />
                  <ArrowUpRight className="h-4 w-4 absolute transform transition-transform duration-300 translate-x-[-16px] translate-y-[16px] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
