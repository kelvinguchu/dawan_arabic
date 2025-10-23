'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/payload-types'
import { Clock } from 'lucide-react'
import { formatTimeAgo } from '@/utils/dateUtils'
import Image from 'next/image'

interface RecentNewsItemProps {
  post: BlogPost
  imageUrl: string | null
}

export const RecentNewsItem: React.FC<RecentNewsItemProps> = ({ post, imageUrl }) => {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block px-2 sm:px-3 py-2 sm:py-2.5 first:pt-0 last:pb-0 transition-colors hover:bg-gray-50"
      aria-label={`اقرأ المقال: ${post.name}`}
    >
      <div className="flex gap-2 sm:gap-3 flex-row-reverse">
        <div className="flex-1 min-w-0">
          <div className="mb-1 text-xs sm:text-sm font-medium text-gray-500 flex items-center flex-row-reverse">
            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1 text-primary" />
            {formatTimeAgo(post.createdAt)}
          </div>
          <h3 className="mb-1 sm:mb-2 font-sans text-sm sm:text-base font-medium text-gray-900 transition-colors group-hover:text-primary line-clamp-2 text-right">
            {post.name}
          </h3>
        </div>
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.name}
              fill
              sizes="(max-width: 640px) 96px, 128px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-xs sm:text-sm text-primary">
                لا توجد صورة
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
