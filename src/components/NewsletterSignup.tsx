'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterResponse {
  message?: string
  error?: string
}

interface NewsletterSignupProps {
  className?: string
  title?: string
  description?: string
  showNameFields?: boolean
  source?: string
  onSuccess?: (data: NewsletterResponse) => void
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = '',
  title = 'اشترك في نشرتنا البريدية',
  description = 'احصل على آخر الأخبار والآراء وتُرسل مباشرة إلى صندوق بريدك.',
  showNameFields = true,
  source = 'website',
  onSuccess,
}) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          source,
        }),
      })

      if (!response.ok) {
        let errorMessage = 'فشل الاشتراك. يرجى المحاولة مرة أخرى.'

        try {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json()
            errorMessage = errorData.error || errorMessage
          } else {
            errorMessage = response.statusText || errorMessage
          }
        } catch {
          console.warn('Failed to parse error response as JSON')
        }

        setMessage({
          type: 'error',
          text: errorMessage,
        })
        return
      }

      let data: NewsletterResponse = {}

      const contentType = response.headers.get('content-type')
      const contentLength = response.headers.get('content-length')

      if (response.status === 204 || response.status === 205 || contentLength === '0') {
        data = { message: 'تم الاشتراك بنجاح!' }
      } else if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError)
          data = { message: 'تم الاشتراك بنجاح!' }
        }
      } else {
        console.warn('Successful response is not JSON format')
        data = { message: 'تم الاشتراك بنجاح!' }
      }

      const isAlreadySubscribed = data.message?.includes('already subscribed')

      setMessage({
        type: isAlreadySubscribed ? 'info' : 'success',
        text: data.message || 'تم الاشتراك بنجاح!',
      })

      if (!isAlreadySubscribed) {
        setEmail('')
        setFirstName('')
        setLastName('')
      }

      if (onSuccess) {
        onSuccess(data)
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage({
        type: 'error',
        text: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`newsletter-signup ${className}`}>
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-right">{title}</h3>
          <p className="text-muted-foreground text-right">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {showNameFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-right">الاسم الأول</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="أحمد"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-right">اسم العائلة</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="علي"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                  className="text-right"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="text-right"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !email.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الاشتراك...
              </>
            ) : (
              'اشترك في النشرة البريدية'
            )}
          </Button>
        </form>

        {message && (
          <Alert
            className={`${
              message.type === 'success'
                ? 'border-green-200 bg-green-50'
                : message.type === 'error'
                  ? 'border-red-200 bg-red-50'
                  : 'border-blue-200 bg-blue-50'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle
                className={`h-4 w-4 ${message.type === 'error' ? 'text-red-600' : 'text-blue-600'}`}
              />
            )}
            <AlertDescription
              className={`${
                message.type === 'success'
                  ? 'text-green-800'
                  : message.type === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
              } text-right`}
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <p className="text-xs text-muted-foreground text-center">
          باشتراكك، فإنك توافق على تلقي رسائل تسويقية عبر البريد الإلكتروني. يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </div>
    </div>
  )
}

export default NewsletterSignup
