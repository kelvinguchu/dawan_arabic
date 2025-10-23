'use client'

import React, { useState, useEffect } from 'react'
import { User as PayloadUser } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck } from 'lucide-react'
import { updateUserName } from '@/lib/auth'

interface UserProfileProps {
  user: PayloadUser
  onUpdate: (updatedUser: PayloadUser) => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name ?? '')
  const [isSavingName, setIsSavingName] = useState(false)

  useEffect(() => {
    setName(user.name ?? '')
  }, [user])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleNameSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSavingName(true)
    try {
      const result = await updateUserName(name)
      if (!result.success) {
        throw new Error(result.error ?? 'لا يمكن تحديث الاسم')
      }
      toast.success('تم تحديث الاسم بنجاح!')
      onUpdate(result.user!)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ غير معروف')
    } finally {
      setIsSavingName(false)
    }
  }

  const handleResendVerification = async () => {
    try {
      toast.info('عملية إعادة إرسال بريد التحقق قيد التطوير.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'لا يمكن إعادة إرسال البريد.')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4 text-right">
            تحديث معلومات الملف الشخصي
          </h3>
          <form onSubmit={handleNameSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="name" className="text-base font-medium text-slate-700 text-right">
                الاسم الكامل
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="أدخل اسمك الكامل"
                disabled={isSavingName}
                className="bg-white border-slate-200 focus:border-primary focus:ring-primary/80 text-base text-right"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="email" className="text-base font-medium text-slate-700 text-right">
                عنوان البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="bg-slate-50 text-slate-500 cursor-not-allowed text-base text-right"
              />
            </div>

            <div className="pt-1 sm:pt-2">
              <Button
                type="submit"
                disabled={isSavingName || name === (user.name ?? '')}
                className="bg-primary hover:bg-primary/80 shadow-sm transition-colors w-full sm:w-auto text-base"
              >
                {isSavingName ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4 text-right">
            حالة الحساب
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3 space-x-reverse">
              <div className="mt-0.5">
                <ShieldCheck
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${user.isEmailVerified ? 'text-green-500' : 'text-amber-500'}`}
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center flex-wrap gap-2 flex-row-reverse">
                  <h4 className="text-base font-medium text-slate-700 mr-0 text-right">التحقق من البريد الإلكتروني</h4>
                  {user.isEmailVerified ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 hover:bg-green-100 shadow-sm text-sm"
                    >
                      تم التحقق
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 shadow-sm text-sm"
                    >
                      في الانتظار
                    </Badge>
                  )}
                </div>

                {!user.isEmailVerified && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-primary hover:text-primary/80 mt-1 text-right"
                    onClick={handleResendVerification}
                  >
                    إعادة إرسال بريد التحقق
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 sm:pt-4">
              <div className="flex items-center justify-between flex-wrap gap-2 flex-row-reverse">
                <div>
                  <h4 className="text-base font-medium text-slate-700 text-right">مستوى الاشتراك</h4>
                </div>
                <Badge
                  variant="outline"
                  className="capitalize bg-slate-50 text-slate-600 border-slate-200 shadow-sm text-sm"
                >
                  {user.subscriptionTier || 'مجاني'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
