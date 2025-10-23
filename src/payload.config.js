import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { BlogPost } from './collections/BlogPosts.ts'
import { BlogCategories } from './collections/BlogCategories.ts'
import { Podcasts } from './collections/Podcasts.ts'
import { Staging } from './collections/Staging.ts'
import { Newsletter } from './collections/Newsletter.ts'
import { NewsletterCampaigns } from './collections/NewsletterCampaigns.ts'
import { PodcastSeries } from './collections/PodcastSeries.ts'
import { PushSubscriptions } from './collections/PushSubscriptions.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- بوابة أفريقيا',
      favicon: '/favicon.png',
      ogImage: '/logo.png',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: './components/admin/Logo.tsx',
        Icon: './components/admin/Icon.tsx',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [
    Users,
    Media,
    BlogPost,
    BlogCategories,
    Podcasts,
    Staging,
    Newsletter,
    NewsletterCampaigns,
    PodcastSeries,
    PushSubscriptions,
  ],
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
    transactionOptions: false,
  }),

  email: resendAdapter({
    defaultFromAddress: 'info@dawan.africa',
    defaultFromName: 'بوابة أفريقيا',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  express: {
    json: { limit: '500mb' },
    urlencoded: { limit: '500mb', extended: true },
  },

  upload: {
    limits: {
      fileSize: 300_000_000,
    },
  },

  sharp,

  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
        clientUploads: true,
        routerInputConfig: {
          video: { maxFileSize: '300MB' },
          audio: { maxFileSize: '500MB' },
          blob: { maxFileSize: '300MB' },
          pdf: { maxFileSize: '100MB' },
          image: { maxFileSize: '20MB' },
        },
      },
    }),

    payloadCloudPlugin(),
  ],
})
