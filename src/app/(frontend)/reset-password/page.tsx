'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { KeyRound, ArrowLeft, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  useEffect(() => {
    if (!token) {
      setMessage({
        type: 'error',
        text: 'رمز إعادة التعيين غير صالح أو مفقود. يرجى طلب إعادة تعيين كلمة مرور جديدة.',
      })
    }
  }, [token])

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل'
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل'
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل'
    }
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!token) {
      setMessage({
        type: 'error',
        text: 'رمز إعادة التعيين غير صالح. يرجى طلب إعادة تعيين كلمة مرور جديدة.',
      })
      return
    }

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'كلمتا المرور غير متطابقتين.',
      })
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setMessage({
        type: 'error',
        text: passwordError,
      })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const result = await resetPassword({
        token,
        password,
      })

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'تمت إعادة تعيين كلمة المرور بنجاح. جارٍ توجيهك إلى صفحة تسجيل الدخول...',
        })

        setPassword('')
        setConfirmPassword('')

        setTimeout(() => {
          router.push(
            '/login?message=تمت إعادة تعيين كلمة المرور بنجاح. يرجى تسجيل الدخول باستخدام كلمة المرور الجديدة.',
          )
        }, 3000)
      } else {
        setMessage({
          type: 'error',
          text:
            result.error ||
            'فشلت إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.',
        })
      }
    } catch (error: unknown) {
      console.error('Reset password error:', error)

      let errorMessage = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (!navigator.onLine) {
        errorMessage = 'لا يوجد اتصال بالإنترنت. يرجى التحقق من شبكتك والمحاولة مرة أخرى.'
      }

      setMessage({
        type: 'error',
        text: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 shadow-lg overflow-hidden">
          <CardHeader className="bg-white space-y-1 pb-6">
            <CardTitle className="text-3xl font-semibold text-slate-900 text-center">
              إعادة تعيين كلمة المرور
            </CardTitle>
            <CardDescription className="text-slate-500 text-center text-base">
              أدخل كلمة المرور الجديدة أدناه
            </CardDescription>
          </CardHeader>

          <CardContent className="bg-white pt-2 pb-8 px-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5 text-right">
                <Label htmlFor="password" className="text-base font-medium text-slate-700">
                  كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="pr-10 pl-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                    placeholder="أدخل كلمة مرور جديدة"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || !token}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <Label htmlFor="confirmPassword" className="text-base font-medium text-slate-700">
                  تأكيد كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="pr-10 pl-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                    placeholder="تأكيد كلمة المرور الجديدة"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading || !token}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-right">
                <p className="text-sm font-medium text-slate-600 mb-2">متطلبات كلمة المرور:</p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li className="flex items-center gap-1 flex-row-reverse">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-slate-300'}`}
                    />
                    <span>8 أحرف على الأقل</span>
                  </li>
                  <li className="flex items-center gap-1 flex-row-reverse">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${/(?=.*[a-z])/.test(password) ? 'bg-green-500' : 'bg-slate-300'}`}
                    />
                    <span>حرف صغير واحد على الأقل</span>
                  </li>
                  <li className="flex items-center gap-1 flex-row-reverse">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${/(?=.*[A-Z])/.test(password) ? 'bg-green-500' : 'bg-slate-300'}`}
                    />
                    <span>حرف كبير واحد على الأقل</span>
                  </li>
                  <li className="flex items-center gap-1 flex-row-reverse">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${/(?=.*\d)/.test(password) ? 'bg-green-500' : 'bg-slate-300'}`}
                    />
                    <span>رقم واحد على الأقل</span>
                  </li>
                </ul>
              </div>

              {message && (
                <Alert
                  className={`${
                    message.type === 'success'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={`${message.type === 'success' ? 'text-green-800' : 'text-red-800'} text-base`}
                  >
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 shadow-sm transition-colors text-base"
                  disabled={isLoading || !token || !password || !confirmPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جارٍ إعادة تعيين كلمة المرور...
                    </>
                  ) : (
                    'إعادة تعيين كلمة المرور'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-base text-slate-500">
                هل تذكرت كلمة المرور؟{' '}
                <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                  سجل الدخول من هنا
                </Link>
              </p>

              <Link
                href="/"
                className="inline-flex items-center text-base text-slate-500 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 ml-1" />
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 leading-relaxed">
            بعد إعادة تعيين كلمة المرور بنجاح، سيتم توجيهك إلى صفحة تسجيل الدخول.
          </p>
        </div>
      </div>
    </div>
  )
}
