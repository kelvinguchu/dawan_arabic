'use client'

import React, { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, KeyRound, Mail } from 'lucide-react'
import { toast } from 'sonner'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading, error, resendVerification } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const redirectTo = searchParams.get('redirect_to') ?? '/'
    const success = await login(email, password)

    if (success) {
      router.push(redirectTo)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('الرجاء إدخال بريدك الإلكتروني أولاً')
      return
    }

    setIsResending(true)
    try {
      const result = await resendVerification(email)

      if (result.success) {
        toast.success(result.message || 'تم إرسال بريد التحقق!')
      } else {
        toast.error(result.error || 'فشلت إعادة إرسال بريد التحقق')
      }
    } catch (err) {
      console.error('Resend verification error:', err)
      toast.error('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="mx-auto max-w-md w-full px-4 sm:px-0">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white space-y-1 pb-6">
          <CardTitle className="text-3xl font-semibold text-slate-900 text-center">
            تسجيل الدخول
          </CardTitle>
          <CardDescription className="text-slate-500 text-center text-base">
            أدخل معلوماتك للوصول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white pt-2 pb-8 px-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email-address" className="text-base font-medium text-slate-700 text-right">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="الاسم@مثال.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between flex-row-reverse">
                <Label htmlFor="password" className="text-base font-medium text-slate-700 text-right">
                  كلمة المرور
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-base text-red-500 bg-red-50 px-3 py-2 rounded-md text-right">
                {error}
                {error.includes('verify your email') && (
                  <div className="mt-3 pt-3 border-t border-red-100">
                    <div className="flex items-center justify-between flex-row-reverse">
                      <p className="text-sm text-red-600 text-right">لم تستلم البريد؟</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleResendVerification}
                        disabled={isResending}
                        className="h-7 px-3 text-sm border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex-row-reverse"
                      >
                        <Mail className="h-3 w-3 ml-1" />
                        {isResending ? 'جاري الإرسال...' : 'إعادة إرسال البريد'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 shadow-sm transition-colors text-base"
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-base text-slate-500">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="font-medium text-primary hover:text-primary/80">
                إنشاء حساب
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
