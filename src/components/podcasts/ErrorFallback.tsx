'use client'

import React from 'react'

interface ErrorFallbackProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorFallback({
  title = 'حدث خطأ ما',
  message = 'حدث خطأ. يرجى المحاولة مرة أخرى.',
  onRetry,
}: ErrorFallbackProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-right">{title}</h1>
        <p className="text-gray-600 mb-4 text-right text-lg">{message}</p>
        <button
          onClick={handleRetry}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors text-base"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  )
} 
