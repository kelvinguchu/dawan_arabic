import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { verifyUserEmail } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تأكيد البريد الإلكتروني | بوابة أفريقيا',
  description: 'قم بتأكيد عنوان بريدك الإلكتروني لإكمال إعداد حسابك.',
  robots: 'noindex, nofollow',
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams
  const token = params.token

  let status: 'success' | 'error' = 'error'
  let message = ''

  if (!token) {
    status = 'error'
    message = 'رابط التحقق غير صالح. لم يتم تقديم أي رمز.'
  } else {
    const result = await verifyUserEmail(token)
    status = result.success ? 'success' : 'error'
    message = result.success ? result.message! : result.error!
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-16 sm:pt-24">
      <div className="grow flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-slate-200 shadow-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              {status === 'success' && <CheckCircle className="h-12 w-12 text-green-600" />}
              {status === 'error' && <AlertCircle className="h-12 w-12 text-red-600" />}
            </div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              {status === 'success' && 'تم تأكيد البريد الإلكتروني!'}
              {status === 'error' && 'فشل التحقق'}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {status === 'success' && 'تم تأكيد بريدك الإلكتروني بنجاح.'}
              {status === 'error' && 'حدثت مشكلة أثناء التحقق من بريدك الإلكتروني.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div
              className={`p-4 rounded-md text-sm ${
                status === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message}
            </div>

            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full bg-primary hover:bg-primary/80 text-white">
                  الذهاب إلى الصفحة الرئيسية
                </Button>
              </Link>

              {status === 'success' && (
                <Link href="/account" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    الذهاب إلى حسابي
                  </Button>
                </Link>
              )}

              {status === 'error' && (
                <Link href="/register" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    العودة إلى التسجيل
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
