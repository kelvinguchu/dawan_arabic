'use client'

import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { User, Mail, KeyRound } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export const RegisterForm: React.FC = () => {
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة.')
      return
    }

    setIsLoading(true)
    try {
      const normalizedEmail = email.trim().toLowerCase()
      const result = await register({
        name,
        email: normalizedEmail,
        password,
      })

      if (result.success) {
        if (subscribeToNewsletter) {
          try {
            const extractFirstName = (fullName: string): string => {
              const trimmedName = fullName.trim()

              if (!trimmedName) {
                return 'قارئ'
              }

              const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0)
              return nameParts.length > 0 ? nameParts[0] : trimmedName
            }

            await fetch('/api/newsletter/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: normalizedEmail,
                firstName: extractFirstName(name),
                source: 'registration',
              }),
            })
          } catch (newsletterError) {
            console.error('Newsletter subscription error during registration:', newsletterError)
          }
        }

        router.push(`/verify-email/pending?email=${encodeURIComponent(normalizedEmail)}`)
      } else {
        setError(result.error || 'فشل التسجيل. الرجاء المحاولة مرة أخرى.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md w-full px-4 sm:px-0">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white space-y-1 pb-6">
          <CardTitle className="text-3xl font-semibold text-slate-900 text-center">
            إنشاء حساب
          </CardTitle>
          <CardDescription className="text-slate-500 text-center text-base">
            أدخل تفاصيلك لإنشاء حساب جديد
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white pt-2 pb-8 px-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-base font-medium text-slate-700 text-right">
                الاسم الكامل
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="أحمد علي"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email-address-register"
                className="text-base font-medium text-slate-700 text-right"
              >
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="email-address-register"
                  name="email"
                  type="email"
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="الاسم@مثال.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password-register"
                className="text-base font-medium text-slate-700 text-right"
              >
                كلمة المرور
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <Input
                  id="password-register"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="confirm-password"
                className="text-base font-medium text-slate-700 text-right"
              >
                تأكيد كلمة المرور
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pr-10 bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 py-3 flex-row-reverse space-x-reverse">
              <Checkbox
                id="newsletter-subscribe"
                checked={subscribeToNewsletter}
                onCheckedChange={(checked) => setSubscribeToNewsletter(checked as boolean)}
                className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="newsletter-subscribe"
                className="text-base text-slate-600 font-normal cursor-pointer leading-5 text-right"
              >
                اشترك في نشرتنا الإخبارية لتتابع آخر أخبار الصومال
              </Label>
            </div>

            {error && (
              <div className="text-base text-red-500 bg-red-50 px-3 py-2 rounded-md text-right">
                {error}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 shadow-sm transition-colors text-base"
                disabled={isLoading}
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-base text-slate-500">
              هل لديك حساب بالفعل؟{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
