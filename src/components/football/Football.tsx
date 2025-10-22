'use client'

import React, { useState } from 'react'
import { ChevronLeft, AlertCircle, Loader2 } from 'lucide-react'

interface FootballProps {
  selectedCompetition: string | null
  onSelectCompetition: (id: string) => void
}

const Football: React.FC<FootballProps> = ({ selectedCompetition, onSelectCompetition }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const competitions = [
    { id: 'premier-league', name: 'Premier League', widgetId: 'b3186', apiId: '8' },
    { id: 'laliga', name: 'La Liga', widgetId: '53857', apiId: '564' },
    { id: 'serie-a', name: 'Serie A', widgetId: 'c41b3', apiId: '384' },
    { id: 'bundesliga', name: 'Bundesliga', widgetId: '8fe17', apiId: '82' },
    { id: 'ligue-1', name: 'Ligue 1', widgetId: 'a7f7a', apiId: '301' },
    { id: 'champions-league', name: 'UEFA Champions League', widgetId: '1c85e', apiId: '2' },
    { id: 'europa-league', name: 'Europa League', widgetId: '88b8c', apiId: '5' },
    { id: 'conference-league', name: 'Europa Conference League', widgetId: 'eae09', apiId: '2286' },
    { id: 'saudi-pro-league', name: 'Saudi Pro League', widgetId: 'e84b1', apiId: '944' },
    { id: 'mls', name: 'USA Major League Soccer', widgetId: 'f1413', apiId: '779' },
  ]

  // Reset loading/error states when competition changes
  React.useEffect(() => {
    if (selectedCompetition) {
      setIsLoading(true)
      setHasError(false)
    }
  }, [selectedCompetition])

  // If no competition is selected, show the list of competitions
  if (!selectedCompetition) {
    return (
      <div className="w-full h-full">
        <ul className="grid grid-cols-1 gap-2">
          {competitions.map((competition) => (
            <li key={competition.id}>
              <button
                onClick={() => onSelectCompetition(competition.id)}
                className="w-full text-right px-4 py-2 rounded-md hover:bg-gray-100 flex items-center justify-between group flex-row-reverse"
              >
                <span className="font-medium text-gray-800">{competition.name}</span>
                <ChevronLeft className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:-translate-x-1 transition-transform" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // If a competition is selected, show its data
  const selectedComp = competitions.find((c) => c.id === selectedCompetition)

  if (!selectedComp) return null

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="w-full h-full">
      <div
        id={`scoreaxis-widget-${selectedComp.widgetId}`}
        className="border border-gray-200 rounded-md bg-white w-full h-full relative"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <p className="text-gray-600 text-right">جاري تحميل الترتيب...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="flex flex-col items-center max-w-md mx-auto text-center p-6">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 mb-1 text-right">
                فشل تحميل الترتيب
              </h3>
              <p className="text-gray-600 mb-4 text-right">
                لا يمكن تحميل ترتيب {selectedComp.name}. الرجاء التحقق من اتصال
                الإنترنت الخاص بك والمحاولة مرة أخرى.
              </p>
              <button
                onClick={() => {
                  setIsLoading(true)
                  setHasError(false)
                  // Force iframe to reload by changing the key
                  const iframe = document.getElementById(
                    `football-iframe-${selectedComp.widgetId}`,
                  ) as HTMLIFrameElement
                  if (iframe) {
                    const src = iframe.src
                    iframe.src = ''
                    setTimeout(() => {
                      iframe.src = src
                    }, 100)
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}

        <iframe
          id={`football-iframe-${selectedComp.widgetId}`}
          src={`https://www.scoreaxis.com/widget/standings-widget/${selectedComp.apiId}?autoHeight=1&inst=${selectedComp.widgetId}`}
          className="w-full h-full border-none"
          title={`${selectedComp.name} الترتيب`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  )
}

export default Football
