import React from 'react'
import type { Metadata } from 'next'
import PrivacyPolicy from '@/components/privacy-policy/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | بوابة أفريقيا',
  description:
    'سياسة الخصوصية لبوابة أفريقيا - تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية، مع التركيز على المستخدمين في الصومال.',
  openGraph: {
    title: 'سياسة الخصوصية | بوابة أفريقيا',
    description:
      'سياسة الخصوصية لبوابة أفريقيا - كيف يتم جمع بياناتك وحمايتها داخل الصومال.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سياسة الخصوصية | بوابة أفريقيا',
    description:
      'سياسة الخصوصية لبوابة أفريقيا - تعرف على كيفية إدارتنا لبياناتك الشخصية في الصومال.',
  },
}

const PrivacyPolicyPage: React.FC = () => {
  return <PrivacyPolicy />
}

export default PrivacyPolicyPage
