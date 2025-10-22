'use client'

import React from 'react'
import './loader.css'

interface LoadingProps {
  fullScreen?: boolean
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  message = 'جاري تحميل المقال...',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'py-6'}`}
    >
      <div className="loader"></div>
      {message && <p className="text-sm text-gray-600 animate-pulse text-right">{message}</p>}
    </div>
  )
}
