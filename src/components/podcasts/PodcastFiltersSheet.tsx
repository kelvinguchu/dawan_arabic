'use client'

import React from 'react'
import { Podcast, BlogCategory } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, X, SlidersHorizontal } from 'lucide-react'
import { getUniqueSeriesNames } from '@/utils/podcastUtils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface PodcastFiltersSheetProps {
  podcasts: Podcast[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedSeries: string
  setSelectedSeries: (series: string) => void
  sortBy: 'newest' | 'oldest' | 'duration' | 'popularity'
  setSortBy: (sort: 'newest' | 'oldest' | 'duration' | 'popularity') => void
  clearFilters: () => void
  hasActiveFilters: boolean
}

export const PodcastFiltersSheet: React.FC<PodcastFiltersSheetProps> = ({
  podcasts,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSeries,
  setSelectedSeries,
  sortBy,
  setSortBy,
  clearFilters,
  hasActiveFilters,
}) => {
  const categories = Array.from(
    new Set(
      podcasts
        .flatMap((podcast) => podcast.categories || [])
        .filter((cat): cat is BlogCategory => typeof cat === 'object' && cat !== null)
        .map((cat) => ({ id: cat.id, name: cat.name })),
    ),
  )

  const seriesNames = getUniqueSeriesNames(podcasts)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-2xl bg-linear-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white z-50 transition-all duration-500 hover:scale-110 hover:shadow-primary/30"
          size="icon"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[95vw] min-w-[95vw] sm:w-[400px] sm:min-w-[400px] p-0 bg-white"
      >
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>تصفية البودكاستات</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Simple Header */}
          <div className="bg-primary p-4">
            <div className="flex items-center gap-2 flex-row-reverse">
              <Filter className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">المرشحات</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-base font-medium text-slate-700 text-right">التصنيف</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-10 text-right">
                    <SelectValue placeholder="جميع التصنيفات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التصنيفات</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Series Filter */}
              <div className="space-y-2">
                <label className="text-base font-medium text-slate-700 text-right">السلسلة</label>
                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger className="h-10 text-right">
                    <SelectValue placeholder="جميع السلاسل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع السلاسل</SelectItem>
                    {seriesNames.map((series) => (
                      <SelectItem key={series.id} value={series.id}>
                        {series.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div className="space-y-2">
                <label className="text-base font-medium text-slate-700 text-right">الترتيب</label>
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as 'newest' | 'oldest' | 'duration' | 'popularity')
                  }
                >
                  <SelectTrigger className="h-10 text-right">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="oldest">الأقدم</SelectItem>
                    <SelectItem value="duration">الأطول</SelectItem>
                    <SelectItem value="popularity">الأكثر شعبية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="space-y-2 pt-4 border-t border-slate-200">
                  <label className="text-base font-medium text-slate-700 text-right">المرشحات النشطة</label>
                  <div className="flex flex-wrap gap-2 flex-row-reverse">
                    {searchTerm && (
                      <Badge variant="secondary" className="text-sm">
                        البحث: &quot;{searchTerm}&quot;
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mr-1 hover:text-slate-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedCategory !== 'all' && (
                      <Badge variant="secondary" className="text-xs">
                        {categories.find((c) => c.id === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="mr-1 hover:text-slate-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedSeries !== 'all' && (
                      <Badge variant="secondary" className="text-xs">
                        {seriesNames.find((s) => s.id === selectedSeries)?.name}
                        <button
                          onClick={() => setSelectedSeries('all')}
                          className="mr-1 hover:text-slate-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                  >
                    <X className="w-4 h-4 ml-2" />
                    مسح الكل
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
