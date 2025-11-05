import type { CollectionConfig } from 'payload'

import {
  generateVerificationEmailHTML,
  generateVerificationEmailSubject,
} from '../templates/verification-email.ts'
import {
  generateForgotPasswordEmailHTML,
  generateForgotPasswordEmailSubject,
} from '../templates/forgot-password-email.ts'

const VERIFICATION_EMAIL_LOG_LIMIT = 10

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: generateVerificationEmailHTML,
      generateEmailSubject: generateVerificationEmailSubject,
    },
    forgotPassword: {
      generateEmailHTML: generateForgotPasswordEmailHTML,
      generateEmailSubject: generateForgotPasswordEmailSubject,
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'User Management',
    defaultColumns: ['name', 'email', 'roles', 'subscriptionTier', 'isEmailVerified', 'createdAt'],
    listSearchableFields: ['name', 'email'],
    description:
      'Manage user accounts and roles for the blog platform. Assign content creator roles to enable post submission workflow.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      access: {
        read: () => true, // Name is publicly readable
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      unique: true,
      access: {
        read: ({ req }) => {
          // Only logged-in users can read email addresses
          return Boolean(req.user)
        },
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      label: "User's profile picture.",
      maxDepth: 1,
      admin: {
        description: 'Upload a profile picture for the user.',
      },
      access: {
        read: ({ req }) => {
          // Only logged-in users can see profile pictures
          return Boolean(req.user)
        },
      },
    },
    {
      name: 'roles',
      type: 'select',
      label: 'User Roles',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        { label: '👑 Admin', value: 'admin' },
        { label: '📊 Analyst', value: 'analyst' },
        { label: '✍️ Columnist', value: 'columnist' },
        { label: '📰 Reporter', value: 'reporter' },
        { label: '🤝 Contributor', value: 'contributor' },
        { label: '👤 User', value: 'user' },
      ],
      admin: {
        description:
          'Select the roles for this user. Content creators can write posts, admins can approve them.',
      },
      access: {
        read: () => true, // Roles are publicly readable
        create: ({ req }) => {
          const user = req.user
          return Boolean(user?.roles?.includes('admin'))
        },
        update: ({ req }) => {
          const user = req.user
          return Boolean(user?.roles?.includes('admin'))
        },
      },
    },
    {
      name: 'subscriptionTier',
      type: 'select',
      label: 'Subscription Tier',
      defaultValue: 'free',
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Premium', value: 'premium' },
      ],
      admin: {
        description: 'User subscription level for premium content access.',
      },
      access: {
        read: ({ req }) => {
          // Only logged-in users can see subscription info
          return Boolean(req.user)
        },
      },
    },
    {
      name: 'isEmailVerified',
      type: 'checkbox',
      label: 'Has the user verified their email address?',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Automatically updated when user verifies their email.',
      },
      access: {
        read: ({ req }) => {
          return Boolean(req.user)
        },
      },
    },
    {
      name: 'likedPosts',
      type: 'relationship',
      relationTo: 'blogPosts',
      hasMany: true,
      label: 'Liked Posts',
      admin: {
        readOnly: true,
      },
      access: {
        read: ({ req, doc }) => {
          // Users can only see their own liked posts
          return Boolean(req.user && req.user.id === doc?.id)
        },
      },
    },
    {
      name: 'favoritedPosts',
      type: 'relationship',
      relationTo: 'blogPosts',
      hasMany: true,
      label: 'Favorited Posts',
      admin: {
        readOnly: true,
      },
      access: {
        read: ({ req, doc }) => {
          // Users can only see their own favorited posts
          return Boolean(req.user && req.user.id === doc?.id)
        },
      },
    },
    {
      name: 'verificationEmailRequests',
      type: 'array',
      label: 'سجل رسائل التحقق',
      admin: {
        readOnly: true,
        description:
          'تسجل هذه القائمة آخر رسائل التحقق المرسلة لهذا المستخدم خلال الفترة الزمنية المحددة.',
      },
      access: {
        read: ({ req, doc }) => {
          const user = req.user
          if (!user) return false
          if (user.roles?.includes('admin')) return true
          return user.id === doc?.id
        },
      },
      fields: [
        {
          name: 'sentAt',
          type: 'date',
          label: 'تاريخ الإرسال',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
          label: 'سياق الطلب',
        },
      ],
    },
  ],
  hooks: {
    beforeLogin: [
      async ({ user, req }) => {
        if (!user?._verified) {
          throw new Error(
            'يرجى التحقق من عنوان بريدك الإلكتروني قبل تسجيل الدخول. تحقق من بريدك الإلكتروني للحصول على رابط التحقق.',
          )
        }

        if (!user.isEmailVerified && req?.payload) {
          try {
            // Keep the custom flag aligned with Payload's internal verification state.
            await req.payload.update({
              collection: 'users',
              id: user.id,
              data: {
                isEmailVerified: true,
              },
              overrideAccess: true,
            })

            user.isEmailVerified = true
          } catch (error) {
            req.payload.logger?.warn?.(
              {
                err: error,
                userId: user.id,
              },
              'تعذر مزامنة حقل isEmailVerified أثناء تسجيل الدخول.',
            )
          }
        }

        return user
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        if (data._verified !== undefined) {
          data.isEmailVerified = data._verified
        }

        const nowISOString = new Date().toISOString()

        if (operation === 'create') {
          const hasExistingLog = Array.isArray(data.verificationEmailRequests)
            ? data.verificationEmailRequests.length > 0
            : false
          if (!hasExistingLog) {
            data.verificationEmailRequests = [
              {
                sentAt: nowISOString,
                context: 'auto-create',
              },
            ]
          }
        }

        if (Array.isArray(data.verificationEmailRequests)) {
          const sanitizedEntries = data.verificationEmailRequests
            .filter((entry) => {
              if (!entry?.sentAt) return false
              const parsed = new Date(entry.sentAt as string)
              return !Number.isNaN(parsed.getTime())
            })
            .map((entry) => ({
              ...entry,
              sentAt: new Date(entry.sentAt as string).toISOString(),
            }))
            .sort(
              (a, b) =>
                new Date(a.sentAt as string).getTime() - new Date(b.sentAt as string).getTime(),
            )
            .slice(-VERIFICATION_EMAIL_LOG_LIMIT)

          data.verificationEmailRequests = sanitizedEntries
        }

        return data
      },
    ],
  },
  access: {
    create: () => true,

    // Allow public reads; sanitize in afterRead
    read: () => true,

    update: ({ req }) => {
      const user = req.user
      if (!user) return false

      if (user.roles?.includes('admin')) {
        return true
      }

      return { id: { equals: user.id } }
    },

    delete: ({ req }) => {
      const user = req.user
      return Boolean(user?.roles?.includes('admin'))
    },
  },
}
