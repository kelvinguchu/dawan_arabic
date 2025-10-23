'use client'

import React, { useState, useRef } from 'react'
import { User as PayloadUser, Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { UploadCloud, Mail, Calendar } from 'lucide-react'
import { updateUserProfilePicture } from '@/lib/auth'

interface UserBioProps {
  user: PayloadUser
  onUpdate: (updatedUser: PayloadUser) => void
}

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

export const UserBio: React.FC<UserBioProps> = ({ user, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploadingPicture, setIsUploadingPicture] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handlePictureUpload = async () => {
    if (!selectedFile) {
      toast.error('يرجى اختيار صورة أولاً.')
      return
    }
    setIsUploadingPicture(true)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const mediaResponse = await fetch('/api/media', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!mediaResponse.ok) {
        const errorData = await mediaResponse.json()
        throw new Error(errorData.errors?.[0]?.message ?? 'لم يتم رفع الصورة')
      }
      const newMedia = (await mediaResponse.json()).doc as Media

      const result = await updateUserProfilePicture(newMedia.id)

      if (!result.success) {
        await fetch(`/api/media/${newMedia.id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        throw new Error(result.error ?? 'لا يمكن تحديث صورة الملف الشخصي')
      }

      toast.success('تم تحديث صورة الملف الشخصي بنجاح!')
      onUpdate(result.user!)
      setSelectedFile(null)
      setPreviewUrl(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ غير معروف')
    } finally {
      setIsUploadingPicture(false)
    }
  }

  let currentProfilePicUrl: string | undefined = previewUrl ?? undefined
  if (
    !previewUrl &&
    user.profilePicture &&
    typeof user.profilePicture === 'object' &&
    user.profilePicture.url
  ) {
    currentProfilePicUrl = user.profilePicture.url
  }

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'غير معروف'

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary/80 to-slate-100 h-24 sm:h-32"></div>
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 relative">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end flex-row-reverse">
          <div className="-mt-10 sm:-mt-12 mb-2 sm:mb-3 relative">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-md">
              <AvatarImage
                src={currentProfilePicUrl}
                alt={user.name ?? 'صورة الملف الشخصي'}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl sm:text-3xl font-semibold bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/png, image/jpeg, image/gif, image/webp"
              className="hidden"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight truncate text-right">
              {user.name || user.email?.split('@')[0]}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-2">
              <div className="flex items-center text-sm sm:text-base text-slate-500 flex-row-reverse">
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-sm sm:text-base text-slate-500 flex-row-reverse">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 flex-shrink-0" />
                <span className="truncate">عضو منذ {joinDate}</span>
              </div>
            </div>
          </div>

          <div className="sm:mr-auto flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPicture}
              className="text-sm sm:text-base shadow-sm w-full sm:w-auto"
            >
              <UploadCloud className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              تغيير الصورة
            </Button>
            {selectedFile && (
              <Button
                type="button"
                size="sm"
                onClick={handlePictureUpload}
                disabled={isUploadingPicture || !previewUrl}
                className="bg-primary hover:bg-primary/80 text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                {isUploadingPicture ? 'جاري الرفع...' : 'رفع'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
