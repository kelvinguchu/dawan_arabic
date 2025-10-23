"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { BlogPost } from "@/payload-types"
import { Zap } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { formatTimeAgo } from "@/utils/dateUtils"

interface FlashTickerProps {
  posts: BlogPost[]
  intervalMs?: number
  className?: string
}

export const FlashTicker: React.FC<FlashTickerProps> = ({ posts, intervalMs = 5000, className }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!posts || posts.length === 0) return

    if (posts.length === 1) {
      setIndex(0)
      return
    }

    const t = setInterval(() => {
      setIndex(prevIndex => {
        let newIndex = prevIndex
        while (newIndex === prevIndex) {
          newIndex = Math.floor(Math.random() * posts.length)
        }
        return newIndex
      })
    }, intervalMs)

    return () => clearInterval(t)
  }, [posts, intervalMs])

  const current = posts?.[index]
  if (!current) return null

  return (
    <div
      className={`relative overflow-hidden border-b h-10 sm:h-11 bg-linear-to-b from-primary/5 to-primary/3 border-primary/12 ${className ?? ""}`}
    >
      <div className="flex items-stretch h-full">
        <div className="flex items-center gap-1 px-3 sm:px-4 text-white bg-primary">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
          <span className="text-sm sm:text-base font-bold uppercase tracking-wide">عاجل</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex-1 h-full flex items-center px-3 sm:px-4 overflow-hidden"
          >
            <Link
              href={`/news/${current.slug}`}
              className="text-gray-900 hover:text-primary hover:underline transition-colors"
            >
              <span className="line-clamp-1 text-sm sm:text-base font-medium text-right">{current.name}</span>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div
          className="hidden sm:flex items-center px-4 text-sm border-l border-primary/20 text-primary/80"
        >
          {formatTimeAgo(current.createdAt)}
        </div>
      </div>
    </div>
  )
}

export default FlashTicker

