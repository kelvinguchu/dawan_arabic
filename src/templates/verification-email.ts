import type { PayloadRequest } from 'payload'

const resolveBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://bawaba.africa'

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export const buildVerificationEmailURL = (token?: string): string => {
  const baseUrl = resolveBaseUrl()
  const safeToken = encodeURIComponent(token || '')
  return `${baseUrl}/verify-email?token=${safeToken}`
}

export const generateVerificationEmailHTML = (args?: {
  req?: PayloadRequest
  token?: string
  user?: {
    email: string
    name?: string
  }
}): string => {
  const { token, user } = args || {}

  const baseUrl = resolveBaseUrl()
  const verifyEmailURL = buildVerificationEmailURL(token)
  const safeUserEmail = escapeHtml(user?.email || 'Unknown User')
  const safeUserName = escapeHtml(user?.name || 'User')
  const currentYear = new Date().getFullYear()

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تحقق من بريدك الإلكتروني - بوابة أفريقيا</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
    <div style="background-color: #0f172a; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
  <img src="${baseUrl}/logo.png" alt="بوابة أفريقيا" style="max-width: 200px; height: auto;">
    </div>
    
    <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #2ac4f3; text-align: center; margin-bottom: 24px; font-size: 28px;">مرحباً بك في بوابة أفريقيا!</h1>

      <p style="font-size: 16px; margin-bottom: 20px;">مرحباً ${safeUserName}،</p>

      <p style="font-size: 16px; margin-bottom: 20px;" dir="rtl">
        شكراً لانضمامك إلى بوابة أفريقيا باستخدام بريدك الإلكتروني ${safeUserEmail}.
        لإكمال تسجيلك والبدء في استكشاف محتوانا، يرجى التحقق من عنوان بريدك الإلكتروني.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${verifyEmailURL}"
           style="background-color: #2ac4f3; color: white; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.3s;">
          تحقق من عنوان البريد الإلكتروني
        </a>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-bottom: 16px;" dir="rtl">
        إذا لم يعمل الزر أعلاه، انسخ والصق هذا الرابط في متصفحك:
      </p>
      <p style="font-size: 14px; color: #2ac4f3; word-break: break-all; margin-bottom: 24px;" dir="rtl">
        ${verifyEmailURL}
      </p>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
        <h3 style="color: #2ac4f3; margin-bottom: 16px;" dir="rtl">ماذا بعد؟</h3>
        <ul style="color: #666; font-size: 14px; line-height: 1.6;" dir="rtl">
          <li>📰 الوصول إلى الأخبار العاجلة من جميع أنحاء أفريقيا</li>
          <li>🌍 استكشاف القصص من جميع الدول الأفريقية</li>
          <li>💬 الانضمام إلى النقاشات مع مجتمعنا</li>
          <li>📧 الحصول على تحديثات الأخبار المخصصة</li>
        </ul>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-top: 32px; text-align: center;" dir="rtl">
        إذا لم تنشئ حساباً معنا، يرجى تجاهل هذا البريد الإلكتروني.
      </p>

      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #999; margin: 0;" dir="rtl">
          © ${currentYear} بوابة أفريقيا. جميع الحقوق محفوظة.<br>
          مصدركم الموثوق للأخبار والرؤى الأفريقية.
        </p>
      </div>
    </div>
  </body>
</html>
  `
}

export const generateVerificationEmailSubject = (_args?: {
  req?: PayloadRequest
  user?: {
    email: string
    name?: string
  }
}): string => {
  return 'مرحباً بك في بوابة أفريقيا - يرجى التحقق من بريدك الإلكتروني'
}

export const generateVerificationEmailText = (args?: {
  req?: PayloadRequest
  token?: string
  user?: {
    email: string
    name?: string
  }
}): string => {
  const { token, user } = args || {}
  const verifyEmailURL = buildVerificationEmailURL(token)
  const safeUserName = user?.name || user?.email || 'المستخدم'

  return `مرحباً ${safeUserName},

شكراً لانضمامك إلى بوابة أفريقيا. لإكمال التسجيل والوصول إلى جميع المزايا، يرجى التحقق من بريدك الإلكتروني عبر الرابط التالي:

${verifyEmailURL}

إذا لم تنشئ حساباً لدينا، يمكنك تجاهل هذا البريد الإلكتروني.`
}
