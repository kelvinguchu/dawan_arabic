import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { PendingVerificationClient } from './PendingVerificationClient'

export const metadata: Metadata = {
  title: 'تأكيد البريد الإلكتروني | بوابة أفريقيا',
  description: 'انتقل إلى بريدك الإلكتروني لاستكمال تفعيل حسابك على بوابة أفريقيا.',
  robots: 'noindex, nofollow',
}

interface PendingVerificationPageProps {
  searchParams: Promise<{ email?: string }>
}

async function PendingVerificationContent({
  searchParams,
}: Readonly<PendingVerificationPageProps>) {
  const params = await searchParams
  const email = params.email ?? ''

  return <PendingVerificationClient initialEmail={email} />
}

export default function PendingVerificationPage(props: Readonly<PendingVerificationPageProps>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 sm:py-24">
      <Suspense
        fallback={<div className="text-sm text-slate-500">يتم تجهيز تعليمات التحقق...</div>}
      >
        <PendingVerificationContent {...props} />
      </Suspense>
    </div>
  )
}
