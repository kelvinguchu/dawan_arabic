'use client'

import React, { useState, FormEvent, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CategorySearchProps {
  placeholder?: string
  className?: string
  inputClassName?: string
  buttonClassName?: string
  categorySlug: string
  onSearchChange?: (searchTerm: string) => void
}

export const CategorySearch: React.FC<CategorySearchProps> = ({
  placeholder = 'ابحث في مقالات هذا القسم...',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  categorySlug,
  onSearchChange,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setInputValue(urlSearch)
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClearSearch = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
    performSearch('')
  }

  const performSearch = (searchTerm?: string) => {
    const term = searchTerm !== undefined ? searchTerm : inputValue.trim()

    const params = new URLSearchParams(searchParams.toString())

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    params.delete('page')

    const url = `/categories/${categorySlug}?${params.toString()}`
    router.push(url)

    if (onSearchChange) {
      onSearchChange(term)
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    performSearch()
  }

  return (
    <form onSubmit={handleFormSubmit} className={`flex items-center gap-2 ${className} flex-row-reverse`}>
      <div className="relative flex-grow">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        <Input
          ref={inputRef}
          name="search"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`pr-9 sm:pr-10 pl-9 text-right ${inputClassName}`}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button
        type="submit"
        size="default"
        className={`bg-primary hover:bg-primary/80 ${buttonClassName}`}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">بحث</span>
      </Button>
    </form>
  )
}
