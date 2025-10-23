'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState<{
    type: 'success' | 'error' | 'info'
    text: string
  } | null>(null)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscriptionMessage(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'footer',
        }),
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let errorMessage = 'فشل الاشتراك. يرجى المحاولة مرة أخرى.'

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorData.message || errorMessage
          } catch {}
        }

        setSubscriptionMessage({
          type: 'error',
          text: errorMessage,
        })
        return
      }

      const contentType = response.headers.get('content-type')

      if (!contentType || !contentType.includes('application/json')) {
        setSubscriptionMessage({
          type: 'success',
          text: 'تم الاشتراك في نشرتنا البريدية بنجاح!',
        })
        setEmail('')
        return
      }

      const data = await response.json()

      const isAlreadySubscribed = data.message?.includes('already subscribed')

      setSubscriptionMessage({
        type: isAlreadySubscribed ? 'info' : 'success',
        text: isAlreadySubscribed ? data.message : 'تم الاشتراك في نشرتنا البريدية بنجاح!',
      })

      if (!isAlreadySubscribed) {
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubscriptionMessage({
        type: 'error',
        text: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <div className="border-t border-slate-800 mt-6 sm:mt-10 pt-6 sm:pt-8">
      <div className="max-w-2xl mx-auto text-center">
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
          تابع آخر أخبار الصومال
        </h4>
        <p className="text-slate-300 text-base mb-6">
          احصل على آخر الأخبار والتحليلات مباشرة في صندوق بريدك.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="max-w-sm mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing}
                className="h-10 pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary/80 text-right"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
            <Button
              type="submit"
              disabled={isSubscribing || !email.trim()}
              className="h-10 px-6 bg-primary hover:bg-primary/80 text-white border-0"
            >
              {isSubscribing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الاشتراك...
                </>
              ) : (
                'اشترك'
              )}
            </Button>
          </div>

          {subscriptionMessage && (
            <Alert
              className={`mt-4 ${
                subscriptionMessage.type === 'success'
                  ? 'border-green-500/20 bg-green-500/10 text-green-400'
                  : subscriptionMessage.type === 'error'
                    ? 'border-red-500/20 bg-red-500/10 text-red-400'
                    : 'border-blue-500/20 bg-blue-500/10 text-blue-400'
              }`}
            >
              {subscriptionMessage.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : subscriptionMessage.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-blue-400" />
              )}
              <AlertDescription
                className={
                  subscriptionMessage.type === 'success'
                    ? 'text-green-400'
                    : subscriptionMessage.type === 'error'
                      ? 'text-red-400'
                      : 'text-blue-400'
                }
              >
                {subscriptionMessage.text}
              </AlertDescription>
            </Alert>
          )}
        </form>

        <p className="text-slate-400 text-sm mt-4">
          انضم إلى مجتمع القراء النشطين. يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </div>
    </div>
  )
}
