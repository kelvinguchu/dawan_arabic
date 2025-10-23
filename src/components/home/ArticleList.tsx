"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/payload-types"
import { formatTimeAgo } from "@/utils/dateUtils"
import { getPostExcerpt, getPostImageFromLayout } from "@/utils/postUtils"

interface ArticleListProps {
  posts: BlogPost[]
  className?: string
}

export const ArticleList: React.FC<ArticleListProps> = ({ posts, className }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => {
          const image = getPostImageFromLayout(post.layout)
          const excerpt = getPostExcerpt(post, { maxLength: 120 })

          return (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-200 flex flex-col"
              aria-label={`اقرأ المقال: ${post.name}`}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden">
                {image ? (
                  <Image src={image} alt={post.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-muted to-accent" />
                )}
              </div>
              <div className="p-3 sm:p-4 flex flex-col grow">
                <div className="grow">
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors text-right">
                    {post.name}
                  </h3>
                  {excerpt && (
                    <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2 text-right">{excerpt}</p>
                  )}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-gray-500 text-right">{formatTimeAgo(post.createdAt)}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ArticleList
