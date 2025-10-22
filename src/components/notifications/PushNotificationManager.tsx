'use client'

import React, { useEffect, useState } from 'react'
import { Bell, BellOff, Loader2 } from 'lucide-react'
import { subscribeUser, unsubscribeUser, type PushSubscriptionData } from '@/lib/push-notifications'
import { toast } from 'sonner'

function base64UrlToUint8Array(base64UrlData: string): Uint8Array {
  const padding = '='.repeat((4 - (base64UrlData.length % 4)) % 4)
  const base64 = (base64UrlData + padding).replace(/\-/g, '+').replace(/\_/g, '/')
  const rawData = atob(base64)
  const buffer = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i)
  }
  return buffer
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    // Check if push notifications are supported
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
      checkSubscriptionStatus()
    }
  }, [])

  const checkSubscriptionStatus = async () => {
    try {
      // Use getRegistration() which doesn't wait for activation.
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        const subscription = await registration.pushManager.getSubscription()
        setIsSubscribed(!!subscription)
      } else {
        setIsSubscribed(false)
      }
    } catch {
      // Silently handle error
    }
  }

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      return permission === 'granted'
    } catch {
      return false
    }
  }

  const subscribeToNotifications = async () => {
    if (!isSupported) {
      toast.error('الإشعارات المدفوعة غير مدعومة في هذا المتصفح')
      return
    }

    // Check for HTTPS in production
    if (
      typeof window !== 'undefined' &&
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost'
    ) {
      toast.error('الإشعارات المدفوعة تتطلب HTTPS')
      return
    }

    setIsLoading(true)

    try {
      // Request permission if not already granted
      if (permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) {
          toast.error('تم رفض إذن الإشعارات')
          setIsLoading(false)
          return
        }
      }

      // Register the service worker and wait for it to become active.
      // This is the key to ensuring subscription works reliably.
      const registration = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      // Check if VAPID key is available
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) {
        toast.error('لا يمكن تكوين الإشعارات المدفوعة بشكل صحيح')
        setIsLoading(false)
        return
      }

      // Subscribe to push notifications with a reasonable timeout
      const applicationServerKeyBytes = base64UrlToUint8Array(vapidKey);
      const applicationServerKey = new ArrayBuffer(applicationServerKeyBytes.length);
      new Uint8Array(applicationServerKey).set(applicationServerKeyBytes);

      const subscriptionPromise = registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Subscription timed out after 10 seconds')), 10000)
      })

      const subscription = (await Promise.race([
        subscriptionPromise,
        timeoutPromise,
      ])) as PushSubscription

      const subJSON = subscription.toJSON()

      if (!subJSON.endpoint || !subJSON.keys?.p256dh || !subJSON.keys?.auth) {
        toast.error('لم يتم العثور على معلومات اشتراك صالحة من المتصفح.')
        setIsLoading(false)
        return
      }

      // Send subscription to the server
      const result = await subscribeUser(subJSON as PushSubscriptionData)

      if (result.success) {
        setIsSubscribed(true)
        toast.success('لقد اشتركت في الإشعارات بنجاح!')
      } else {
        toast.error(result.error || 'لا يمكن الاشتراك في الإشعارات')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير معروف'
      toast.error(`فشل الاشتراك: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const unsubscribeFromNotifications = async () => {
    if (!isSupported) return

    setIsLoading(true)

    try {
      // Wait for the service worker to be ready to ensure we can get the subscription.
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        const subJSON = subscription.toJSON()
        if (!subJSON.endpoint) {
          setIsLoading(false)
          return
        }

        // Unsubscribe from push manager
        await subscription.unsubscribe()

        // Remove subscription from server
        const result = await unsubscribeUser(subJSON as PushSubscriptionData)

        if (result.success) {
          setIsSubscribed(false)
          toast.success('لقد ألغيت اشتراكك في الإشعارات بنجاح')
        } else {
          toast.error(result.error || 'لا يمكن إلغاء الاشتراك في الإشعارات')
        }
      } else {
        // If there's no subscription but state is subscribed, sync it
        setIsSubscribed(false)
        toast.info('لم يتم العثور على اشتراك نشط.')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير معروف'
      toast.error(`فشل إلغاء الاشتراك: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {permission === 'denied' ? (
        <div className="text-xs text-gray-500">الإشعارات محظورة</div>
      ) : (
        <button
          onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
          disabled={isLoading}
          className="flex items-center cursor-pointer gap-2 px-1 py-1.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 flex-row-reverse"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSubscribed ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
          <span className="text-xs">
            {isLoading ? 'جاري التحميل...' : isSubscribed ? 'إلغاء الإشعارات' : 'تفعيل الإشعارات'}
          </span>
        </button>
      )}
    </div>
  )
}
