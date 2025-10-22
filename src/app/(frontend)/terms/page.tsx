import React from 'react'
import type { Metadata } from 'next'
import TermsAndConditions from '@/components/terms/TermsAndConditions'

export const metadata: Metadata = {
  title: 'الشروط والأحكام | بوابة أفريقيا',
  description:
    'شروط وأحكام بوابة أفريقيا - تعرف على شروط الخدمة وحسابات المستخدمين وسياسات الاشتراك وإرشادات الاستخدام المقبول لخدمة بوابة أفريقيا في الصومال.',
  openGraph: {
    title: 'الشروط والأحكام | بوابة أفريقيا',
    description:
      'شروط وأحكام بوابة أفريقيا - شرح لقواعد الخدمة وحسابات المستخدمين وسياسات الاشتراك والاستخدام المقبول داخل الصومال.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الشروط والأحكام | بوابة أفريقيا',
    description:
      'شروط وأحكام بوابة أفريقيا - تفاصيل حول قواعد الخدمة والاستخدام في الصومال.',
  },
}

const TermsAndConditionsPage: React.FC = () => {
  return <TermsAndConditions />
}

export default TermsAndConditionsPage
