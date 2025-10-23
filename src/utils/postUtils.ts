import { BlogPost, Media, User } from '@/payload-types'

type ImageSize = 'thumbnail' | 'card' | 'tablet'

export const getPostImageFromLayout = (  layout: BlogPost['layout'],  size?: ImageSize,): string | null => {
  if (!layout) return null
  for (const block of layout) {
    if (block.blockType === 'cover' && block.image) {
      const media = typeof block.image === 'string' ? null : (block.image as Media)
      if (!media) return null
      return size ? media.sizes?.[size]?.url ?? media.url ?? null : media.url ?? null
    }
  }
  for (const block of layout) {
    if (block.blockType === 'image' && block.image) {
      const media = typeof block.image === 'string' ? null : (block.image as Media)
      if (!media) return null
      return size ? media.sizes?.[size]?.url ?? media.url ?? null : media.url ?? null
    }
  }
  return null
}

interface GetPostExcerptOptions {
  prioritizeCoverSubheading?: boolean
  maxLength?: number
}

export const getPostExcerpt = (
  post: BlogPost,
  options: GetPostExcerptOptions = { prioritizeCoverSubheading: true, maxLength: 180 },
): string => {
  const { prioritizeCoverSubheading = true, maxLength = 180 } = options
  if (!post.layout) return ''

  if (prioritizeCoverSubheading) {
    for (const block of post.layout) {
      if (block.blockType === 'cover' && block.subheading) {
        const subheading = (block.subheading && typeof block.subheading === 'object' && 'ar' in block.subheading)
          ? (block.subheading as { ar: string }).ar
          : '';
        return subheading.length > maxLength
          ? `${subheading.substring(0, maxLength)}...`
          : subheading
      }
    }
  }

  for (const block of post.layout) {
    if (block.blockType === 'richtext' && block.content) {
      const localizedContent = (block.content && typeof block.content === 'object' && 'ar' in block.content)
        ? (block.content as Record<string, typeof block.content>).ar
        : null;

      if (localizedContent?.root?.children?.[0]?.text) {
        const text = localizedContent.root.children[0].text as string
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
      }
    }
  }

  return ''
}

export const getAuthorDisplayName = (author: BlogPost['author']): string => {
  if (!author) return 'Unknown Author'

  if (typeof author === 'object' && author !== null) {
    const user = author as User
    return user.name || user.email?.split('@')[0] || 'Unknown Author'
  }
  return 'Unknown Author'
}

export const getAuthorName = (author: BlogPost['author']): string => {
  if (!author) return 'Unknown Author'

  if (typeof author === 'object' && author !== null) {
    const user = author as User
    return user.name || 'Unknown Author'
  }
  return 'Unknown Author'
}

export const getAuthorRole = (author: BlogPost['author']): string => {
  if (!author) return 'Contributor'

  if (typeof author === 'object' && author !== null) {
    const user = author as User
    if (user.roles && user.roles.length > 0) {
      const contentCreatorRoles = ['analyst', 'columnist', 'reporter', 'contributor']
      const contentCreatorRole = user.roles.find((role) => contentCreatorRoles.includes(role))

      const primaryRole =
        contentCreatorRole || user.roles.find((role) => role !== 'user') || user.roles[0]

      switch (primaryRole) {
        case 'admin':
          return 'Admin'
        case 'analyst':
          return 'Analyst'
        case 'columnist':
          return 'Columnist'
        case 'reporter':
          return 'Reporter'
        case 'contributor':
          return 'Contributor'
        default:
          return 'Contributor'
      }
    }
  }
  return 'Contributor'
}

export const getLocalizedField = (field: string | { ar: string } | undefined | null, fallback: string): string => {
  if (field && typeof field === 'object' && 'ar' in field) {
    return field.ar;
  }
  // If it's not a localized object, assume it's the non-localized string value.
  // This handles cases where data might not be localized yet, but `field` is directly a string.
  return (typeof field === 'string' ? field : fallback);
};

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
  tag?: string
  fields?: { url?: string }
  url?: string
}

export const extractPlainTextFromLexical = (content: any): string => {
  if (!content || typeof content !== 'object' || !('root' in content)) {
    return '';
  }

  const rootContent = content as { root?: { children?: LexicalNode[] } };
  if (!rootContent.root?.children) {
    return '';
  }

  const convertLexicalNodesToText = (nodes: LexicalNode[]): string => {
    return nodes
      .map((node) => {
        if (!node) return ''
        if (node.type === 'text') {
          return node.text || ''
        }
        if (node.children) {
          return convertLexicalNodesToText(node.children)
        }
        return ''
      })
      .join('')
  }

  return convertLexicalNodesToText(rootContent.root.children).trim();
};

export const getPostAuthorName = (post: BlogPost): string => {
  if (post.useManualReporter && post.manualReporter?.name) {
    return getLocalizedField(post.manualReporter.name, '')
  }

  return getAuthorName(post.author)
}

export const getPostAuthorRole = (post: BlogPost): string => {
  if (post.useManualReporter && post.manualReporter) {
    if (post.manualReporter.useCustomRole && post.manualReporter.customRole) {
      return getLocalizedField(post.manualReporter.customRole, '')
    }

    if (post.manualReporter.role) {
      const roleMapping: Record<string, string> = {
        reporter: 'Reporter',
        correspondent: 'Correspondent',
        freelance: 'Freelance Journalist',
        contributor: 'Contributing Writer',
        'special-correspondent': 'Special Correspondent',
        'field-reporter': 'Field Reporter',
        investigative: 'Investigative Journalist',
        analyst: 'News Analyst',
        'senior-correspondent': 'Senior Correspondent',
        'bureau-chief': 'Bureau Chief',
      }

      return roleMapping[post.manualReporter.role] || post.manualReporter.role
    }
  }

  return getAuthorRole(post.author)
}

export const getPostAuthorDisplayName = (post: BlogPost): string => {
  if (post.useManualReporter && post.manualReporter?.name) {
    return getLocalizedField(post.manualReporter.name, '')
  }

  return getAuthorDisplayName(post.author)
}

export const getReporterUrl = (post: BlogPost): string => {
  const reporterName = getPostAuthorName(post)
  return `/news?reporter=${encodeURIComponent(reporterName)}`
}
