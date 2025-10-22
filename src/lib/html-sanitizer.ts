export function sanitizeHTML(html: string): string {
  if (!html) return ''

  const allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 'i', 'b',
    'ul', 'ol', 'li', 'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'div', 'span', 'blockquote'
  ]

  const allowedAttributes = [
    'href', 'src', 'alt', 'title', 'style', 'target', 'width', 'height', 'class', 'id', 'rel'
  ]

  let sanitized = html

  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '')
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '')
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/data:(?!image\/(png|jpg|jpeg|gif|webp))/gi, '')
  sanitized = sanitized.replace(/vbscript:/gi, '')

  const tagPattern = new RegExp(`<(?!\\/?(${allowedTags.join('|')})\\b)[^>]*>`, 'gi')
  sanitized = sanitized.replace(tagPattern, '')

  sanitized = sanitized.replace(/<(\w+)(\s[^>]*)?\/?>/g, (match, tagName, attributesStr) => {
    const isClosingTag = match.startsWith('</')
    const lowerTagName = tagName.toLowerCase()

    if (isClosingTag) {
      return allowedTags.includes(lowerTagName) ? match : ''
    }

    if (!allowedTags.includes(lowerTagName)) {
      return ''
    }

    let cleanAttributes = ''
    if (attributesStr) {
      const attrRegex = /(\w+(?:-\w+)*)=(["'])([^"']*)\2/g
      let attrMatch
      while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
        const [, attrName, , attrValue] = attrMatch
        if (allowedAttributes.includes(attrName)) {
          if (attrName === 'href' || attrName === 'src') {
            const safeUrlPattern = /^(?:(?:https?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
            if (!safeUrlPattern.test(attrValue)) continue
          }
          cleanAttributes += ` ${attrName}="${attrValue}"`
        }
      }
    }

    if (lowerTagName === 'a') {
      if (!attributesStr?.includes('target=')) cleanAttributes += ' target="_blank"'
      if (!attributesStr?.includes('rel=')) cleanAttributes += ' rel="noopener noreferrer"'
    }

    return `<${lowerTagName}${cleanAttributes}>`
  })

  return sanitized.trim()
}