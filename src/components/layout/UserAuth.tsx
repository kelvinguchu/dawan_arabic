'use client'

import React from 'react'
import Link from 'next/link'
import { BiUser, BiUserPlus, BiLogOut } from 'react-icons/bi'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'

const getInitials = (name?: string | null, email?: string | null): string => {
  if (name) {
    const parts = name.split(' ')
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  if (email) {
    return email.substring(0, 2).toUpperCase()
  }
  return 'U'
}

const UserAuth: React.FC = () => {
  const { user, isLoading: authLoading, logout: authLogout } = useAuth()

  if (authLoading) {
    return <Skeleton className="h-5 w-20" />
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/account"
          className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors flex-row-reverse"
        >
          <div className="flex items-center">
            <Avatar className="h-6 w-6 ml-1.5 border border-slate-200">
              <AvatarImage
                src={
                  user.profilePicture &&
                  typeof user.profilePicture === 'object' &&
                  user.profilePicture.url
                    ? user.profilePicture.url
                    : undefined
                }
                alt={user.name ?? 'User'}
              />
              <AvatarFallback className="text-[10px] font-medium bg-slate-100 text-slate-500">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline max-w-[100px] truncate">
              {user.name ?? user.email?.split('@')[0]}
            </span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            await authLogout()
          }}
          className="text-gray-600 hover:text-red-500 -mr-2"
          aria-label="تسجيل الخروج"
        >
          <BiLogOut className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors flex-row-reverse"
      >
        <BiUser size={16} className="ml-1" />
        <span className="hidden sm:inline">تسجيل الدخول</span>
      </Link>
      <Link
        href="/register"
        className="hidden sm:flex items-center text-xs text-gray-500 hover:text-primary transition-colors flex-row-reverse"
      >
        <BiUserPlus size={16} className="ml-1" />
        <span className="hidden sm:inline">إنشاء حساب</span>
      </Link>
    </>
  )
}

export default UserAuth
