'use client'

import React, { useState, useEffect } from 'react'
import { User as PayloadUser } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { BellIcon, LogOut } from 'lucide-react'
import { PushNotificationManager } from '@/components/notifications/PushNotificationManager'
import { Skeleton } from '@/components/ui/skeleton'

interface UserSettingsProps {
  user: PayloadUser
}

export const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
  const [isEmailSubscribed, setIsEmailSubscribed] = useState<boolean | null>(null)
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!user.email) return
      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, source: 'settings-check' }),
        })

        if (!response.ok && response.status !== 409) {
          throw new Error('لا يمكن التحقق من حالة الاشتراك')
        }

        const data = await response.json()
        setIsEmailSubscribed(data.message?.includes('already subscribed'))
      } catch {
        setIsEmailSubscribed(false)
      }
    }

    checkSubscriptionStatus()
  }, [user.email])

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      window.location.href = '/'
    } catch {
      toast.error('حدث خطأ أثناء تسجيل الخروج.')
    }
  }

  const handleEmailNotificationToggle = async (enabled: boolean) => {
    if (!user.email) {
      toast.error('لم يتم العثور على بريد إلكتروني للمستخدم.')
      return
    }

    setIsUpdatingEmail(true)
    const endpoint = enabled ? '/api/newsletter/subscribe' : '/api/newsletter/unsubscribe'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'لا يمكن تحديث الاشتراك')
      }

      setIsEmailSubscribed(enabled)
      toast.success(`إشعارات النشرة البريدية ${enabled ? 'تم تفعيلها' : 'تم إلغاؤها'}.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ غير معروف')
      setIsEmailSubscribed(!enabled)
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start flex-row-reverse">
            <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 mt-0.5 sm:mt-1 ml-2 sm:ml-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4 text-right">
                إعدادات الإشعارات
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2 space-x-reverse">
                  <Label
                    htmlFor="email-notifications"
                    className="text-sm sm:text-base font-medium text-slate-700 cursor-pointer text-right"
                  >
                    النشرة البريدية
                  </Label>
                  {isEmailSubscribed === null ? (
                    <Skeleton className="h-6 w-11 rounded-full" />
                  ) : (
                    <Switch
                      id="email-notifications"
                      checked={isEmailSubscribed}
                      onCheckedChange={handleEmailNotificationToggle}
                      disabled={isUpdatingEmail}
                    />
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <Label className="text-sm sm:text-base font-medium text-slate-700 text-right">
                    إشعارات الدفع
                  </Label>
                  <PushNotificationManager />
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 text-sm sm:text-base h-8 sm:h-9"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
