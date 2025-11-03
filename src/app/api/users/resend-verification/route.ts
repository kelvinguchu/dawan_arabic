import { NextRequest, NextResponse } from 'next/server'
import { resendVerificationUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ message: 'عنوان البريد الإلكتروني مطلوب.' }, { status: 400 })
    }

    const result = await resendVerificationUser(email, { context: 'api-route' })

    if (!result.success) {
      let status = 400
      if (result.code === 'rate_limit') {
        status = 429
      } else if (result.code === 'not_found') {
        status = 200
      }

      const message =
        result.error ||
        (result.code === 'not_found'
          ? 'إذا كان هناك حساب بهذا البريد الإلكتروني، فقد تم إرسال رسالة التحقق.'
          : 'تعذر إعادة إرسال بريد التحقق.')

      return NextResponse.json({ message }, { status })
    }

    return NextResponse.json(
      { message: result.message || 'تم إرسال بريد التحقق بنجاح.' },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('Resend verification error:', error)

    return NextResponse.json(
      { message: 'An error occurred while sending the verification email. Please try again.' },
      { status: 500 },
    )
  }
}
