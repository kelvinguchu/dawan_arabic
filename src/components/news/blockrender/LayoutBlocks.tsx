import React from 'react'
import { ExternalLink } from 'lucide-react'
import {
  generateFallbackContentData,
  BlockType,
  TableRow,
  LayoutColumn,
  LexicalContent,
  BlockRendererProps,
} from './BlockUtils'

// Forward declaration for recursive BlockRenderer usage
let BlockRenderer: React.FC<BlockRendererProps>

export const setBlockRendererReference = (renderer: typeof BlockRenderer) => {
  BlockRenderer = renderer
}

// Table Block Component
export const TableBlock: React.FC<{ rows?: TableRow[] }> = ({ rows }) => {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-right">
        <tbody>
          {rows?.map((row: TableRow, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.cells?.map((cell, cellIndex: number) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-right">
                  {cell.content || cell.text || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Layout/Columns Block Component
export const LayoutBlock: React.FC<{ columns?: LayoutColumn[] }> = ({ columns }) => {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {columns?.map((column: LayoutColumn, index: number) => (
        <div key={index} className="space-y-4">
          {column.content && BlockRenderer && (
            <BlockRenderer block={{ blockType: 'richtext', content: column.content }} />
          )}
        </div>
      ))}
    </div>
  )
}

// Collapsible/Details Block Component
export const CollapsibleBlock: React.FC<{
  summary?: string
  title?: string
  content?: LexicalContent
}> = ({ summary, title, content }) => {
  return (
    <details className="my-6 border border-gray-200 rounded-lg">
      <summary className="px-4 py-3 bg-gray-50 cursor-pointer font-medium hover:bg-gray-100 transition-colors text-right">
        {summary || title || 'اعرض التفاصيل'}
      </summary>
      <div className="px-4 py-3 text-right">
        {content && BlockRenderer && (
          <BlockRenderer block={{ blockType: 'richtext', content: content }} />
        )}
      </div>
    </details>
  )
}

// Spoiler Block Component
export const SpoilerBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return (
    <details className="my-4 inline-block">
      <summary className="cursor-pointer px-2 py-1 bg-gray-800 text-white rounded text-base hover:bg-gray-700 transition-colors">
        محتوى مخفي
      </summary>
      <span className="mr-2">{text || content || ''}</span>
    </details>
  )
}

// Hashtag Block Component
export const HashtagBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return (
    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-base font-medium ml-2">
      #{text || content || 'وسم'}
    </span>
  )
}

// Mention Block Component
export const MentionBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return (
    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded font-medium">
      @{text || content || 'إشارة'}
    </span>
  )
}

// Emoji Block Component
export const EmojiBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return <span className="text-xl">{text || content || '😊'}</span>
}

// Link Block Component
export const LinkBlock: React.FC<{
  url?: string
  href?: string
  text?: string
  content?: string
}> = ({ url, href, text, content }) => {
  const linkUrl = url || href || '#'
  const linkText = text || content || 'رابط'
  const isExternal = linkUrl.startsWith('http')

  return (
    <a
      href={linkUrl}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center flex-row-reverse"
    >
      {linkText}
      {isExternal && <ExternalLink className="mr-1 h-3 w-3" />}
    </a>
  )
}

// Auto Link Block Component
export const AutoLinkBlock: React.FC<{
  url?: string
  content?: string
}> = ({ url, content }) => {
  const autoUrl = url || content || '#'
  const autoIsExternal = autoUrl.startsWith('http')

  return (
    <a
      href={autoUrl}
      target={autoIsExternal ? '_blank' : undefined}
      rel={autoIsExternal ? 'noopener noreferrer' : undefined}
      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center flex-row-reverse"
    >
      {autoUrl}
      {autoIsExternal && <ExternalLink className="mr-1 h-3 w-3" />}
    </a>
  )
}

// Mark/Highlight Block Component
export const MarkBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return <mark className="bg-yellow-200 px-1 rounded">{text || content || ''}</mark>
}

// Keyboard Block Component
export const KeyboardBlock: React.FC<{ text?: string; content?: string }> = ({ text, content }) => {
  return (
    <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-base font-mono text-right">
      {text || content || ''}
    </kbd>
  )
}

// Math/Equation Block Component
export const MathBlock: React.FC<{
  equation?: string
  content?: string
  text?: string
}> = ({ equation, content, text }) => {
  return (
    <div className="my-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
      <code className="font-mono text-base">{equation || content || text || 'معادلة رياضية'}</code>
    </div>
  )
}

// Simple Iframe Block Component (different from main EmbedBlock)
export const SimpleIframeBlock: React.FC<{
  url?: string
  src?: string
  title?: string
  caption?: string
}> = ({ url, src, title, caption }) => {
  const embedUrl = url || src || ''
  if (!embedUrl) return null

  return (
    <div className="my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title || 'محتوى مضمّن'}
        />
      </div>
      {caption && <p className="text-center text-gray-600 mt-3 text-base">{caption}</p>}
    </div>
  )
}

// Simple Twitter Block Component (different from TwitterEmbedBlock)
export const SimpleTweetBlock: React.FC<{
  text?: string
  content?: string
  username?: string
}> = ({ text, content, username }) => {
  return (
    <div className="my-8 max-w-md mx-auto">
      <blockquote className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-right">
        <p className="text-gray-800 mb-3">{text || content || ''}</p>
        <cite className="text-base text-gray-600">— @{username || 'twitter'} على تويتر</cite>
      </blockquote>
    </div>
  )
}

// Figcaption Block Component
export const FigcaptionBlock: React.FC<{ text?: string; content?: string }> = ({
  text,
  content,
}) => {
  return (
    <figcaption className="text-center text-gray-600 mt-3 text-base italic">
      {text || content || ''}
    </figcaption>
  )
}

// Audio Block Component
export const AudioBlock: React.FC<{
  url?: string
  src?: string
  caption?: string
}> = ({ url, src, caption }) => {
  const audioUrl = url || src || ''
  if (!audioUrl) return null

  return (
    <figure className="my-8">
      <audio controls className="w-full max-w-md mx-auto">
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/ogg" />
        متصفحك لا يدعم عنصر الصوت.
      </audio>
      {caption && (
        <figcaption className="text-center text-gray-600 mt-3 text-base">{caption}</figcaption>
      )}
    </figure>
  )
}

// Simple Elements
export const LineBreakBlock: React.FC = () => <br />

export const TabBlock: React.FC = () => <span className="inline-block w-8" />

export const HorizontalRuleBlock: React.FC = () => (
  <hr className="my-8 border-0 h-0.5 bg-gray-300 w-full" />
)

// Fallback Block Component for unsupported types
export const FallbackBlock: React.FC<{ block: BlockType }> = ({ block }) => {
  const fallbackData = generateFallbackContentData(block)

  return (
    <div className="my-8 p-6 bg-amber-50 border border-amber-300 rounded-lg">
      <p className="font-medium text-amber-800 mb-3">
        Unsupported content block: {fallbackData.blockType}
      </p>
      <pre className="text-base bg-white/50 p-4 rounded border border-amber-200 text-amber-700 overflow-x-auto">
        {fallbackData.serializedBlock}
      </pre>
    </div>
  )
}
