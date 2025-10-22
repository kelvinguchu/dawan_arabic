'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchInput } from '@/components/common/SearchInput'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { ListFilter, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface NewsListClientProps {
  initialSearchTerm: string
  initialSortBy: string
  currentPage: number
  totalPages: number
  reporterName?: string
}

export const NewsListClient: React.FC<NewsListClientProps> = ({ initialSortBy, reporterName }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/news${query}`)
  }

  const handleSortChange = (value: string) => {
    updateSearchParams({
      sort: value === '-createdAt' ? null : value,
      page: null,
    })
  }

  return (
    <>
      {reporterName && (
        <div className="mb-4 text-right">
          <Link
            href="/news"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium flex-row-reverse"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            العودة إلى جميع الأخبار
          </Link>
        </div>
      )}
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 sm:gap-6">
        <div className="text-right">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-1 sm:mb-2">
            {reporterName ? `مقالات بقلم ${reporterName}` : 'آخر الأخبار'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            {reporterName
              ? `تصفح جميع مقالات بقلم ${reporterName}.`
              : 'تابع مقالاتنا وآخر الآراء والتحليلات.'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
          <SearchInput
            inputClassName="h-9 sm:h-10 w-full bg-white shadow-sm text-sm"
            className="w-full sm:flex-grow"
            redirectPath="/news"
          />
          <Select value={initialSortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-9 sm:h-10 w-full sm:w-40 md:w-48 bg-white shadow-sm text-xs sm:text-sm">
              <ListFilter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-gray-500" />
              <SelectValue placeholder="فرز" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">الأحدث</SelectItem>
              <SelectItem value="createdAt">الأقدم</SelectItem>
              <SelectItem value="name">ترتيب أبجدي (أ-ي)</SelectItem>
              <SelectItem value="-name">ترتيب أبجدي (ي-أ)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}

interface PaginationClientProps {
  currentPage: number
  totalPages: number
}

export const PaginationClient: React.FC<PaginationClientProps> = ({ currentPage, totalPages }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/news${query}`)
  }

  const goToPage = (page: number) => {
    updateSearchParams({
      page: page === 1 ? null : String(page),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getVisiblePageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-8 sm:mt-10 md:mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) goToPage(currentPage - 1)
            }}
            className={
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-primary/80 hover:text-primary'
            }
          />
        </PaginationItem>

        {getVisiblePageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(page as number)
                }}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary/80 hover:text-primary'
                }
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) goToPage(currentPage + 1)
            }}
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-primary/80 hover:text-primary'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
