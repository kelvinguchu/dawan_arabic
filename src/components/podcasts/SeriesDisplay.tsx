'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Podcast, PodcastSery } from '@/payload-types'
import { ChevronDown, ChevronRight, Clock, Calendar, Headphones, Users, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  formatDuration,
  getPodcastCoverImage,
  formatPeopleInvolved,
  sortPodcastsBySeries,
} from '@/utils/podcastUtils'
import { formatTimeAgo } from '@/utils/dateUtils'

interface SeriesDisplayProps {
  series: PodcastSery
  podcasts: Podcast[]
  defaultExpanded?: boolean
  showAllEpisodes?: boolean
  maxEpisodesPreview?: number
}

export const SeriesDisplay: React.FC<SeriesDisplayProps> = ({
  series,
  podcasts,
  defaultExpanded = false,
  showAllEpisodes = false,
  maxEpisodesPreview = 5,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || showAllEpisodes)
  const [showAll, setShowAll] = useState(showAllEpisodes)

  // Filter and sort episodes for this series
  const seriesEpisodes = sortPodcastsBySeries(
    podcasts.filter(
      (podcast) =>
        typeof podcast.series === 'object' &&
        podcast.series?.id === series.id &&
        podcast.isPublished,
    ),
  )

  const displayedEpisodes = showAll ? seriesEpisodes : seriesEpisodes.slice(0, maxEpisodesPreview)
  const hasMoreEpisodes = seriesEpisodes.length > maxEpisodesPreview

  // Calculate series stats
  const totalDuration = seriesEpisodes.reduce((sum, podcast) => sum + (podcast.duration || 0), 0)
  const latestEpisode = seriesEpisodes[seriesEpisodes.length - 1]
  const firstEpisode = seriesEpisodes[0]

  // Get representative cover image (from latest episode or first episode)
  const seriesCoverImage = getPodcastCoverImage(latestEpisode || firstEpisode)

  if (seriesEpisodes.length === 0) {
    return null
  }

  return (
    <div className="relative bg-white rounded-3xl border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-slate-50/30" />

      {/* Series Header */}
      <div className="relative">
        {/* Background Image */}
        {seriesCoverImage && (
          <div className="absolute inset-0 h-40">
            <Image
              src={seriesCoverImage}
              alt={series.name}
              fill
              className="object-cover opacity-10 blur-sm"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/20 to-white" />
          </div>
        )}

        <div className="relative p-8 pb-6">
          <div className="flex items-start gap-6">
            {/* Series Cover */}
            <div className="shrink-0">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20">
                {seriesCoverImage ? (
                  <Image
                    src={seriesCoverImage}
                    alt={series.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/80 via-primary/80 to-primary/5 flex items-center justify-center">
                    <Music className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>
            </div>

            {/* Series Info */}
            <div className="grow min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <Badge className="bg-primary/80 text-white border-primary/80 font-medium">
                      سلسلة البودكاست
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 leading-tight text-right line-clamp-1">
                    <Link
                      href={`/podcasts/series/${series.slug}`}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {series.name}
                    </Link>
                  </h2>

                  {series.description && (
                    <p className="text-slate-600 leading-relaxed line-clamp-2 max-w-2xl">
                      {series.description}
                    </p>
                  )}
                </div>

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 h-10 px-4 rounded-full bg-slate-100/80 backdrop-blur-sm text-slate-600 hover:bg-primary/80 hover:text-primary transition-all duration-300"
                >
                  {isExpanded ? (
                    <>
                      اقرأ الحلقات <ChevronDown className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      أظهر الحلقات <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Series Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{seriesEpisodes.length} حلقات</span>
                </div>

                {totalDuration > 0 && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      {Math.round(totalDuration / 3600)} ساعة{' '}
                      {Math.round((totalDuration % 3600) / 60)} دقيقة إجمالي
                    </span>
                  </div>
                )}

                {latestEpisode && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      آخر حلقة:{' '}
                      {formatTimeAgo(latestEpisode.publishedAt || latestEpisode.createdAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      {isExpanded && (
        <div className="relative">
          <div className="px-8 pb-2">
            <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          <div className="space-y-2">
            {displayedEpisodes.map((podcast, index) => {
              const coverImageUrl = getPodcastCoverImage(podcast)
              const peopleInvolved = formatPeopleInvolved(podcast.peopleInvolved)

              return (
                <div
                  key={podcast.id}
                  className="group mx-6 rounded-2xl border border-slate-200/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/80 bg-white/60 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      {/* Episode Number */}
                      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {podcast.episodeNumber || seriesEpisodes.length - index}
                        </span>
                      </div>

                      {/* Episode Cover */}
                      <div className="shrink-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                          {coverImageUrl ? (
                            <Image
                              src={coverImageUrl}
                              alt={podcast.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-primary/80 via-primary/80 to-primary/5 flex items-center justify-center">
                              <Headphones className="w-6 h-6 text-primary" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Episode Info */}
                      <div className="grow min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-semibold text-slate-900 text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                            <Link
                              href={`/podcasts/${podcast.slug}`}
                              className="hover:text-primary transition-colors duration-300"
                            >
                              {podcast.title}
                            </Link>
                          </h4>

                          <div className="flex items-center gap-2 shrink-0">
                            {podcast.featured && (
                              <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                                مميز
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span className="truncate max-w-32">{peopleInvolved}</span>
                          </div>

                          {podcast.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatDuration(podcast.duration)}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimeAgo(podcast.publishedAt || podcast.createdAt)}</span>
                          </div>

                          {podcast.playCount && podcast.playCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Headphones className="w-3 h-3" />
                              <span>{podcast.playCount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {podcast.description && (
                          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {podcast.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Show More/Less Buttons */}
          {hasMoreEpisodes && (
            <div className="p-6 pt-4">
              {!showAll ? (
                <div className="text-center">
                  <Button
                    onClick={() => setShowAll(true)}
                    className="bg-primary hover:bg-primary/90 text-white h-11 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    أظهر {seriesEpisodes.length - maxEpisodesPreview} حلقات إضافية
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAll(false)}
                    className="text-slate-600 hover:text-primary h-11 px-8 rounded-full hover:bg-primary/80 transition-all duration-300"
                  >
                    أظهر أقل
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
