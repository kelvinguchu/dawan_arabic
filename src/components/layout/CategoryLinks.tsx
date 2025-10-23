'use client'

import React from 'react'
import Link from 'next/link'
import { BlogCategory } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'

interface CategoryLinksProps {
  categories: BlogCategory[]
  countries: string[]
  onCountrySelect: (country: string) => void
  isMobile?: boolean
  onLinkClick?: () => void
}

const prioritizedCategoryNames: string[] = [
  'اخبار',
  'التحليلات',
  'تقارير المجتمع',
  'مقالات',
  'الرئيسة',
  'من نحن',
  'اتصل بنا',
]

const CategoryLinks: React.FC<CategoryLinksProps> = ({
  categories,
  isMobile = false,
  onLinkClick,
}) => {
  const handleMobileLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  const renderLink = (
    href: string,
    text: string,
    icon?: React.ReactNode,
    isButton = !isMobile,
    key?: string,
  ) => {
    const commonClasses = isMobile
      ? 'px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50 hover:text-primary block'
      : 'text-base text-gray-700 hover:text-primary hover:bg-transparent rounded-md whitespace-nowrap flex-shrink-0'

    const content = icon ? (
      <span className="flex items-center">
        {icon}
        {text}
      </span>
    ) : (
      text
    )

    if (isButton && !isMobile) {
      return (
        <Button key={key} variant="ghost" asChild className={commonClasses}>
          <Link href={href} onClick={handleMobileLinkClick}>
            {content}
          </Link>
        </Button>
      )
    }
    return (
      <Link
        key={key}
        href={href}
        className={`${commonClasses} ${icon && isMobile ? 'flex items-center' : ''}`}
        onClick={handleMobileLinkClick}
      >
        {content}
      </Link>
    )
  }

  const renderCategoryLinkNode = (category: BlogCategory, forMobile: boolean) => {
    const categoryName = (category.name && typeof category.name === 'object' && 'ar' in category.name)
      ? (category.name as { ar: string }).ar
      : (category.name as string); // Fallback for non-localized data

    const categorySlug = (category.slug && typeof category.slug === 'object' && 'ar' in category.slug)
      ? (category.slug as { ar: string }).ar
      : (category.slug as string); // Fallback for non-localized data

    return renderLink(
      `/categories/${categorySlug}`,
      categoryName,
      undefined,
      !forMobile,
      category.id,
    )
  }

  const orderedDynamicCategoriesData: BlogCategory[] = []
  const processedCategoryIds = new Set<string>()

  prioritizedCategoryNames.forEach((name) => {
    const category = categories.find((cat) => cat.name === name)
    if (
      category &&
      !processedCategoryIds.has(category.id) &&
      category.name !== 'Uncategorized'
    ) {
      // Filter out Popular News, Recent News, and Blockchain categories
      // Blockchain is handled by the hardcoded /blockchain link to prevent duplication
      if (
        category.name !== 'Popular News' &&
        category.name !== 'Recent News' &&
        category.name.toLowerCase() !== 'blockchain' &&
        category.slug !== 'blockchain'
      ) {
        orderedDynamicCategoriesData.push(category)
        processedCategoryIds.add(category.id)
      }
    }
  })

  categories.forEach((category) => {
    if (
      !processedCategoryIds.has(category.id) &&
      category.name !== 'Uncategorized'
    ) {
      // Filter out Popular News, Recent News, and Blockchain categories
      // Blockchain is handled by the hardcoded /blockchain link to prevent duplication
      if (
        category.name !== 'Popular News' &&
        category.name !== 'Recent News' &&
        category.name.toLowerCase() !== 'blockchain' &&
        category.slug !== 'blockchain'
      ) {
        orderedDynamicCategoriesData.push(category)
      }
    }
  })

  if (isMobile) {
    const mobileDynamicCategoryLinks = orderedDynamicCategoriesData.map((cat) =>
      renderCategoryLinkNode(cat, true),
    )
    return (
      <>
        <div className="pt-2 pb-1" key="mobile-news-categories-header">
          <DropdownMenuLabel className="px-3 text-sm font-normal text-gray-500">
            أقسام الأخبار
          </DropdownMenuLabel>
          {orderedDynamicCategoriesData.length === 0 &&
            categories.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={`mobile-cat-skeleton-${i}`} className="h-10 w-full rounded-md mt-1" />
            ))}
          {orderedDynamicCategoriesData.length === 0 &&
            categories.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={`mobile-no-cat-skeleton-${i}`}
                className="h-10 w-full rounded-md mt-1"
              />
            ))}
          {mobileDynamicCategoryLinks}
        </div>

        <Separator className="my-2" />

        {renderLink('/podcasts', 'البودكاستات', undefined, false, 'mobile-podcasts')}
        {renderLink('/blockchain', 'البلوك تشين', undefined, false, 'mobile-blockchain')}
      </>
    )
  }

  // Desktop view - show all categories plus Blockchain at the end in a horizontal scrollable layout
  const desktopDynamicLinks = orderedDynamicCategoriesData.map((cat) =>
    renderCategoryLinkNode(cat, false),
  )

  const homeLink = renderLink('/', 'الصفحة الرئيسية', undefined, true, 'desktop-home')
  const podcastsLink = renderLink('/podcasts', 'البودكاستات', undefined, true, 'desktop-podcasts')
  const blockchainLink = renderLink(
    '/blockchain',
    'البلوك تشين',
    undefined,
    true,
    'desktop-blockchain',
  )

  // Loading skeleton for desktop
  const skeletonLinks =
    orderedDynamicCategoriesData.length === 0 && categories.length === 0
      ? Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={`desktop-no-cat-skeleton-${i}`}
            className="h-9 w-20 rounded-md shrink-0"
          />
        ))
      : []

  return (
    <div className="flex items-center min-w-max flex-row-reverse">
      {homeLink}
      {desktopDynamicLinks}
      {podcastsLink}
      {blockchainLink}
      {skeletonLinks}
    </div>
  )
}

export default CategoryLinks
