'use client'

import { useState, useEffect } from 'react'
import { formatTimeAgo } from '@/utils/dateUtils'

interface TimeAgoProps {
  dateString: string
  className?: string
}

export function TimeAgo({ dateString, className }: TimeAgoProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !dateString) {
    return <span className={className}>...</span>
  }

  return <span className={className}>{formatTimeAgo(dateString)}</span>
}