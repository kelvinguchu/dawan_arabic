'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { MailCheck, RefreshCw, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'

interface PendingVerificationClientProps {
  initialEmail?: string
}

export const PendingVerificationClient: React.FC<PendingVerificationClientProps> = ({
  initialEmail = '',
}) => {
  const { resendVerification } = useAuth()
  const [email, setEmail] = useState(initialEmail)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )
  const [isResending, setIsResending] = useState(false)

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email])

  const handleResend = async () => {
    if (!normalizedEmail) {
      setFeedback({
        type: 'error',
        message: 'يرجى إدخال البريد الإلكتروني الذي استخدمته أثناء التسجيل.',
      })
      return
    }

    setIsResending(true)
    setFeedback(null)

    try {
      const result = await resendVerification(normalizedEmail)

      if (result.success) {
        setFeedback({
          type: 'success',
          message:
            result.message ||
            'تم إرسال رسالة تحقق جديدة. يرجى فحص البريد الوارد أو مجلد الرسائل غير المرغوب فيها.',
        })
      } else {
        setFeedback({
          type: 'error',
          message: result.error || 'تعذر إرسال رسالة التحقق. يرجى المحاولة مرة أخرى بعد لحظات.',
        })
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      setFeedback({
        type: 'error',
        message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.',
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm max-w-lg w-full text-right">
      <CardHeader className="space-y-3 text-center">
        <div className="flex justify-center">
          <MailCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-semibold text-slate-900">تحقق من بريدك الآن</CardTitle>
        <CardDescription className="text-slate-600">
          قمنا بإرسال رابط تحقق إلى{' '}
          <span className="font-medium text-slate-900">
            {normalizedEmail || 'عنوان بريدك الإلكتروني'}
          </span>
          . يرجى اتباع التعليمات لتفعيل حسابك.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-md p-4 text-sm text-slate-600">
          <div className="flex items-start flex-row-reverse space-x-reverse space-x-3">
            <ShieldAlert className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-2 text-right">
              <p className="font-medium text-slate-700">قبل المتابعة:</p>
              <ul className="list-disc list-inside space-y-1 pr-2">
                <li>افتح الرسالة واضغط على زر التحقق لتفعيل حسابك.</li>
                <li>إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها أو الترويجية.</li>
                <li>صلاحية الرابط محدودة زمنياً، لذا قم بالتفعيل في أقرب وقت.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resend-email" className="text-sm font-medium text-slate-700">
            البريد الإلكتروني
          </Label>
          <Input
            id="resend-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="الاسم@example.com"
            className="bg-white border-slate-200 focus:border-primary focus:ring-primary/10 text-right"
          />
          <Button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="mt-2 w-full bg-primary hover:bg-primary/80"
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            {isResending ? 'جاري الإرسال...' : 'إعادة إرسال رسالة التحقق'}
          </Button>

          {feedback && (
            <div
              className={`mt-3 rounded-md border px-3 py-2 text-sm ${
                feedback.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>

        <div className="text-center text-sm text-slate-600 space-y-2">
          <p>بعد التفعيل، يمكنك العودة لتسجيل الدخول إلى حسابك.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center text-primary hover:text-primary/80"
          >
            العودة إلى صفحة تسجيل الدخول
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
