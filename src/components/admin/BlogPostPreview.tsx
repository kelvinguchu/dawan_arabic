'use client'
import React, { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'
import type { BlogPost } from '@/payload-types'

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

const BlogPostPreview: UIFieldClientComponent = () => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const blogPostField = useFormFields(([fields]) => fields.blogPost)

  useEffect(() => {
    const fetchBlogPost = async () => {
      const blogPostId = blogPostField?.value

      if (!blogPostId) {
        setBlogPost(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/blogPosts/${blogPostId}`)

        if (!response.ok) {
          throw new Error('فشل في جلب المقال')
        }

        const data = await response.json()
        setBlogPost(data)
      } catch (err) {
        console.error('Error fetching blog post for preview:', err)
        setError('فشل في تحميل معاينة المقال')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [blogPostField?.value])

  if (!blogPostField?.value) {
    return null
  }

  if (loading) {
    return (
      <div className="field-type ui">
        <div
          style={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', textAlign: 'right' }}>
            📄 معاينة المقال
          </h3>
          <div style={{ color: '#666', fontStyle: 'italic', textAlign: 'right' }}>جاري تحميل معاينة المقال...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="field-type ui">
        <div
          style={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#fef2f2',
          }}
        >
          <h3
            style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#dc2626', textAlign: 'right' }}
          >
            ❌ خطأ في المعاينة
          </h3>
          <div style={{ color: '#dc2626', textAlign: 'right' }}>{error}</div>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return null
  }

  const getContentPreview = (layout: BlogPost['layout']): string => {
    if (!layout || !Array.isArray(layout)) {
      return 'لا يوجد محتوى متاح'
    }

    try {
      const richtextBlock = layout.find((block) => block.blockType === 'richtext')

      if (!richtextBlock || richtextBlock.blockType !== 'richtext') {
        return 'لم يتم العثور على محتوى نصي'
      }

      const content = richtextBlock.content

      if (!content?.root?.children) {
        return 'لا يوجد محتوى متاح'
      }

      let text = ''
      const extractText = (node: LexicalNode) => {
        if (node.text) text += node.text + ' '
        if (node.children) node.children.forEach(extractText)
      }

      ;(content.root.children as LexicalNode[]).forEach(extractText)
      const cleanText = text.trim()

      return cleanText.length > 200
        ? `${cleanText.substring(0, 200)}...`
        : cleanText || 'لا يوجد محتوى نصي'
    } catch (err) {
      console.error('Error extracting content preview:', err)
      return 'غير قادر على معاينة المحتوى'
    }
  }

  const contentPreview = getContentPreview(blogPost.layout)

  const getAuthorDisplayInfo = (post: BlogPost): string => {
    if (post.useManualReporter && post.manualReporter?.name) {
      const role = post.manualReporter.role ? ` (${post.manualReporter.role})` : ''
      return `${post.manualReporter.name}${role}`
    }

    const author = post.author
    if (typeof author === 'string') {
      return 'معرف الكاتب: ' + author
    }
    if (typeof author === 'object' && author) {
      return author.name || author.email || 'كاتب غير معروف'
    }
    return 'كاتب غير معروف'
  }

  const authorName = getAuthorDisplayInfo(blogPost)

  return (
    <div className="field-type ui">
      <div
        style={{
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333', textAlign: 'right' }}>
          📄 معاينة المقال
        </h3>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#333', fontSize: '18px' }}>
            {blogPost.name || 'مقال بدون عنوان'}
          </strong>
        </div>

        {blogPost.slug && (
          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#666', textAlign: 'right' }}>
            <strong>الرابط:</strong> /{blogPost.slug}
          </div>
        )}

        <div
          style={{
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            lineHeight: '1.5',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: '600', textAlign: 'right' }}>
            معاينة المحتوى:
          </div>
          <div style={{ color: '#333', textAlign: 'right' }}>{contentPreview}</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            fontSize: '14px',
            color: '#666',
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <strong>الكاتب:</strong> {authorName}
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>الحالة:</strong>
            <span
              style={{
                marginRight: '4px',
                padding: '2px 6px',
                backgroundColor: blogPost.status === 'published' ? '#22c55e' : '#f59e0b',
                color: 'white',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              {blogPost.status === 'published' ? '🚀 منشور' : '⏳ في الانتظار'}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>إنشاء:</strong> {new Date(blogPost.createdAt).toLocaleDateString('ar-SA')}
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>تحديث:</strong> {new Date(blogPost.updatedAt).toLocaleDateString('ar-SA')}
          </div>
        </div>

        {/* Additional metadata */}
        {(blogPost.views || blogPost.likes) && (
          <div
            style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #e0e0e0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '14px',
              color: '#666',
            }}
          >
            {blogPost.views && (
              <div style={{ textAlign: 'right' }}>
                <strong>المشاهدات:</strong> {blogPost.views.toLocaleString()}
              </div>
            )}
            {blogPost.likes && (
              <div style={{ textAlign: 'right' }}>
                <strong>الإعجابات:</strong> {blogPost.likes.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPostPreview
