import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BiLogoYoutube,
  BiLogoTwitter,
  BiLogoFacebook,
  BiLogoTiktok,
  BiChevronRight,
  BiMap,
  BiPhone,
  BiEnvelope,
} from 'react-icons/bi'
import { FooterCategories } from './FooterCategories'
import { FooterRecentPosts } from './FooterRecentPosts'
import { FooterNewsletter } from './FooterNewsletter'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="mb-4 sm:mb-6">
              <Image
                src="/logo.png"
                alt="بوابة أفريقيا"
                width={140}
                height={42}
                priority
                className="mb-3 sm:mb-4 w-auto h-[36px] sm:h-[42px]"
              />
              <p className="text-slate-300 text-sm max-w-xs">
                أخبار وتحليلات شاملة حول الصومال وقرن أفريقيا
              </p>
            </div>

            <div className="flex flex-col space-y-2 sm:space-y-3 text-slate-300 text-sm">
              <div className="flex items-center flex-row-reverse">
                <BiMap className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-primary" />
                <span>شارع مارينيو، مقديشو، الصومال</span>
              </div>
              <div className="flex items-center flex-row-reverse">
                <BiPhone className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-primary" />
                <span>+252628881171</span>
              </div>
              <div className="flex items-center flex-row-reverse">
                <BiEnvelope className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-primary" />
                <span>Info@bawaba.africa</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex space-x-3 sm:space-x-4">
              <a
                href="https://www.youtube.com/channel/UCI0ALvkEN9VQwbvmIMHcbvQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-1.5 sm:p-2 rounded-full hover:bg-primary transition-colors"
              >
                <BiLogoYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://x.com/dawan_tv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-1.5 sm:p-2 rounded-full hover:bg-primary transition-colors"
              >
                <BiLogoTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://www.facebook.com/Dawantv/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-1.5 sm:p-2 rounded-full hover:bg-primary transition-colors"
              >
                <BiLogoFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@dawan_tv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-1.5 sm:p-2 rounded-full hover:bg-primary transition-colors"
              >
                <BiLogoTiktok className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          <div className="hidden sm:block sm:col-span-1 lg:col-span-2">
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white relative pb-2 before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-10 sm:before:w-12 before:h-0.5 before:bg-primary text-right">
              روابط سريعة
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-primary transition-colors flex items-center flex-row-reverse"
                >
                  <BiChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1.5 sm:ml-2 rotate-180" />
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-slate-300 hover:text-primary transition-colors flex items-center flex-row-reverse"
                >
                  <BiChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1.5 sm:ml-2 rotate-180" />
                  آخر الأخبار
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-primary transition-colors flex items-center flex-row-reverse"
                >
                  <BiChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1.5 sm:ml-2 rotate-180" />
                  من نحن
                </Link>
              </li>
            </ul>
          </div>

          <FooterCategories />

          <FooterRecentPosts />
        </div>

        <FooterNewsletter />

        <div className="border-t border-slate-800 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-xs sm:text-sm">
            &copy; {currentYear} بوابة أفريقيا. جميع الحقوق محفوظة.
          </p>
          <p className="text-slate-500 text-xs mt-2 sm:mt-0">
            صمم وطور بواسطة{' '}
            <a
              href="https://www.kulmi.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Kulmi Digital
            </a>
          </p>
          <div className="mt-4 sm:mt-0 flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="text-slate-400 hover:text-primary text-xs sm:text-sm"
            >
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-primary text-xs sm:text-sm">
              شروط الخدمة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
