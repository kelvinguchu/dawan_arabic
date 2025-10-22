import { buildUnsubscribeUrl, escapeUrlForHtml } from '@/utils/unsubscribe'

interface WelcomeEmailParams {
  firstName?: string
  email: string
}

interface WelcomeEmailContent {
  subject: string
  html: string
}

export function generateWelcomeEmail({
  firstName,
  email,
}: WelcomeEmailParams): WelcomeEmailContent {
  const subject = 'مرحباً بك في نشرة بوابة أفريقيا البريدية!'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bawaba.africa'

  const unsubscribeUrl = buildUnsubscribeUrl(email)

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مرحباً بك في بوابة أفريقيا</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${siteUrl}/logo.png" alt="بوابة أفريقيا" style="max-width: 200px; height: auto;">
    </div>
    
    <h1 style="color: #2ac4f3; text-align: center;" dir="rtl">مرحباً بك في نشرة بوابة أفريقيا البريدية!</h1>

    ${firstName ? `<p dir="rtl">عزيزي ${firstName}،</p>` : '<p dir="rtl">مرحباً،</p>'}

    <p dir="rtl">شكراً لاشتراكك في نشرة بوابة أفريقيا البريدية! يسعدنا انضمامك إلى مجتمع القراء الذين يبقون على اطلاع على آخر الأخبار والتطورات في جميع أنحاء أفريقيا.</p>

    <p dir="rtl">هذا ما يمكن أن تتوقع منا:</p>
    <ul dir="rtl">
      <li>📰 الأخبار العاجلة من جميع أنحاء القارة الأفريقية</li>
      <li>💼 رؤى تجارية واقتصادية</li>
      <li>🏛️ التطورات والتحليلات السياسية</li>
      <li>🌍 القصص الثقافية والوجهات</li>
      <li>🚀 الابتكار والتحديثات التكنولوجية</li>
    </ul>
    
    <p dir="rtl">سنرسل لك نشرتنا البريدية بانتظام مع قصص مختصة بعناية تهمك أكثر.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${siteUrl}" style="background-color: #2ac4f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">زيارة موقعنا</a>
    </div>

    <p dir="rtl">إذا كان لديك أي أسئلة أو ملاحظات، لا تتردد في الرد على هذا البريد الإلكتروني. نحب أن نسمع منك!</p>

    <p dir="rtl">مع أطيب التحيات،<br>فريق بوابة أفريقيا</p>
    
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;" dir="rtl">
      <p>
        استلمت هذا البريد الإلكتروني لأنك اشتركت في نشرتنا البريدية.
        <br>
        <a href="${escapeUrlForHtml(unsubscribeUrl)}" style="color: #2ac4f3;">إلغاء الاشتراك</a> |
        <a href="${siteUrl}" style="color: #2ac4f3;">زيارة موقعنا</a>
      </p>
      <p>
        بوابة أفريقيا<br>
        شارع مارينيو، مقديشو، الصومال
      </p>
    </div>
  </body>
</html>
  `.trim()

  return {
    subject,
    html,
  }
}
