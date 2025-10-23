import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/payload-types'
import { ArrowRight, Clock } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { TimeAgo } from '@/components/ui/time-ago'

import { getPostImageFromLayout, getPostExcerpt, getPostAuthorDisplayName } from '@/utils/postUtils'

interface TopPostsProps {
  posts: BlogPost[]
}

export const TopPosts: React.FC<TopPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
      {posts.map((post) => {
        const imageUrl = getPostImageFromLayout(post.layout)
        const excerpt = getPostExcerpt(post, { maxLength: 100, prioritizeCoverSubheading: false })
        const authorName = getPostAuthorDisplayName(post)

        return (
          <Card
            key={post.id}
            className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] p-0 gap-0 flex flex-col"
          >
            <Link
              href={`/news/${post.slug}`}
              className="h-full flex flex-col"
              aria-label={`اقرأ المقال: ${post.name}`}
            >
              <div className="relative aspect-video overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.name}
                    fill
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm sm:text-base">لا توجد صورة</span>
                  </div>
                )}
              </div>
              <CardContent className="p-3 sm:p-5 flex flex-col grow">
                <div className="grow">
                  <h3 className="font-sans text-lg sm:text-xl font-bold leading-tight line-clamp-2 mb-2 sm:mb-3 text-gray-800 group-hover:text-primary transition-colors text-right">
                    {post.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-3 sm:mb-4">
                    {excerpt}
                  </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 gap-2 sm:gap-3 flex-wrap flex-row-reverse">
                  <span className="flex items-center">
                    <Clock className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <TimeAgo dateString={post.createdAt} />
                  </span>
                  {typeof post.author === 'object' && post.author && (
                    <span className="flex items-center">
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-300 ml-2"></span>
                      {authorName}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-primary group-hover:text-primary/80 flex-row-reverse">
                  <span className="text-sm sm:text-base">اقرأ المزيد</span>
                  <ArrowRight className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" />
                </div>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
