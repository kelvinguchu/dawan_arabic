import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import { sanitizeHTML } from '../lib/html-sanitizer.ts'

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function enhanceHTMLWithStyling(html: string): string {
  return html
    .replace(/<p>/g, '<p style="margin: 8px 0; color: #333; line-height: 1.6; font-size: 16px;">')
    .replace(
      /<h1>/g,
      '<h1 style="font-size: 28px; font-weight: bold; margin: 16px 0 8px 0; color: #b01c14;">',
    )
    .replace(
      /<h2>/g,
      '<h2 style="font-size: 24px; font-weight: bold; margin: 14px 0 6px 0; color: #b01c14;">',
    )
    .replace(
      /<h3>/g,
      '<h3 style="font-size: 20px; font-weight: bold; margin: 12px 0 6px 0; color: #333;">',
    )
    .replace(
      /<h4>/g,
      '<h4 style="font-size: 18px; font-weight: bold; margin: 10px 0 4px 0; color: #333;">',
    )
    .replace(
      /<h5>/g,
      '<h5 style="font-size: 16px; font-weight: bold; margin: 8px 0 4px 0; color: #333;">',
    )
    .replace(
      /<h6>/g,
      '<h6 style="font-size: 14px; font-weight: bold; margin: 8px 0 4px 0; color: #333;">',
    )
    .replace(/<ul>/g, '<ul style="margin: 8px 0; padding-left: 20px;">')
    .replace(/<ol>/g, '<ol style="margin: 8px 0; padding-left: 20px;">')
    .replace(/<li>/g, '<li style="margin: 2px 0; color: #333; line-height: 1.6;">')
    .replace(
      /<blockquote>/g,
      '<blockquote style="margin: 8px 0; padding: 12px; border-left: 4px solid #b01c14; background-color: #f8f9fa; font-style: italic; color: #555;">',
    )
    .replace(
      /<hr\s*\/?>/g,
      '<hr style="margin: 12px 0; border: none; border-top: 2px solid #e9ecef;" />',
    )
    .replace(/<a /g, '<a style="color: #b01c14; text-decoration: underline;" ')
    .replace(
      /<code>/g,
      '<code style="background-color: #f1f1f1; padding: 2px 4px; border-radius: 3px; font-family: monospace;">',
    )
}

export async function generateNewsletterCampaignEmailHTML(
  content: unknown,
  subject: string,
  subscriberEmail: string,
  unsubscribeUrl: string,
): Promise<string> {
  let htmlContent = ''

  if (content && typeof content === 'object' && 'root' in content) {
    try {
      htmlContent = await convertLexicalToHTMLAsync({
        data: content as Parameters<typeof convertLexicalToHTMLAsync>[0]['data'],
      })

      htmlContent = enhanceHTMLWithStyling(htmlContent)
      htmlContent = sanitizeHTML(htmlContent)
    } catch (error) {
      console.error('Error converting Lexical to HTML:', error)
      htmlContent =
        '<p style="margin: 8px 0; color: #333; line-height: 1.6; font-size: 16px;">Content could not be processed</p>'
    }
  } else {
    htmlContent =
      '<p style="margin: 8px 0; color: #333; line-height: 1.6; font-size: 16px;">No content available</p>'
  }

  const escapedSubject = escapeHtml(subject)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${escapedSubject}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Main styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f4f4f4;
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background-color: #0f172a;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header img {
            max-width: 180px;
            height: auto;
            display: block;
            margin: 0 auto 20px auto;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            line-height: 1.2;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .content p {
            margin: 0 0 20px 0;
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
        }
        
        .content p:last-child {
            margin-bottom: 0;
        }
        
        .cta-section {
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #b01c14;
            color: #ffffff !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        
        .cta-button:hover {
            background-color: #1e90a6;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            margin: 8px 0;
            font-size: 14px;
            color: #6c757d;
            line-height: 1.4;
        }
        
        .footer a {
            color: #b01c14;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .unsubscribe {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }
        
        .unsubscribe p {
            font-size: 12px;
            color: #868e96;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            
            .header, .content, .footer {
                padding: 20px !important;
            }
            
            .header h1 {
                font-size: 24px !important;
            }
            
            .header img {
                max-width: 150px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="https://bawaba.africa/logo.png" alt="بوابة أفريقيا" />
            <h1>${escapedSubject}</h1>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            ${htmlContent}
            
            <div class="cta-section">
                <a href="https://bawaba.africa" class="cta-button">Visit Our Website</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>بوابة أفريقيا</strong></p>
            <p>Warar iyo falanqayn qoto dheer oo ku saabsan Soomaaliya iyo Geeska Afrika</p>
            <p>
                <a href="mailto:info@bawaba.africa">info@bawaba.africa</a> | 
                <a href="https://bawaba.africa">www.bawaba.africa</a>
            </p>
            <p>Marinio Rd, Mogadishu, Somalia | +252628881171</p>
            
            <div class="unsubscribe">
                <p>This email was sent to ${subscriberEmail}</p>
                <p>
                    <a href="${escapeHtml(unsubscribeUrl)}">Unsubscribe</a> | 
                    <a href="https://bawaba.africa/newsletter">Update Preferences</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `.trim()
}

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
  tag?: string
  fields?: { url?: string }
  url?: string
}

function convertLexicalNodeToText(node: LexicalNode): string {
  if (!node) return ''

  if (node.type === 'text') {
    return node.text || ''
  }

  switch (node.type) {
    case 'paragraph':
      const paragraphContent = node.children ? convertLexicalNodesToText(node.children) : ''
      return paragraphContent + '\n'

    case 'heading':
      const headingContent = node.children ? convertLexicalNodesToText(node.children) : ''
      const level = node.tag?.replace('h', '') || '1'
      const prefix = level === '1' ? '# ' : level === '2' ? '## ' : level === '3' ? '### ' : ''
      return prefix + headingContent + '\n\n'

    case 'list':
      const listContent = node.children ? convertLexicalNodesToText(node.children) : ''
      return listContent + '\n'

    case 'listitem':
      const listItemContent = node.children ? convertLexicalNodesToText(node.children) : ''
      return '• ' + listItemContent.replace(/\n+$/, '') + '\n'

    case 'quote':
      const quoteContent = node.children ? convertLexicalNodesToText(node.children) : ''
      return '> ' + quoteContent.replace(/\n+$/, '') + '\n\n'

    case 'horizontalrule':
      return '─────────────────────────────────────\n\n'

    case 'link':
      const linkContent = node.children ? convertLexicalNodesToText(node.children) : ''
      const url = node.fields?.url || node.url || '#'
      return `${linkContent} (${url})`

    case 'linebreak':
      return '\n'

    default:
      if (node.children) {
        return convertLexicalNodesToText(node.children)
      }
      return ''
  }
}

function convertLexicalNodesToText(nodes: LexicalNode[]): string {
  return nodes
    .map((node) => {
      return convertLexicalNodeToText(node)
    })
    .join('')
}

export function generateNewsletterCampaignEmailText(
  content: unknown,
  subject: string,
  subscriberEmail: string,
  unsubscribeUrl: string,
): string {
  let textContent = ''

  if (content && typeof content === 'object' && 'root' in content) {
    const rootContent = content as { root?: { children?: LexicalNode[] } }
    if (rootContent.root?.children) {
      textContent = convertLexicalNodesToText(rootContent.root.children).trim()
    } else {
      textContent = 'No content available'
    }
  } else {
    textContent = 'No content available'
  }

  return `
بوابة أفريقيا NEWSLETTER
${subject}
================================

${textContent}

Visit our website: https://bawaba.africa

================================
ABOUT بوابة أفريقيا

Warar iyo falanqayn qoto dheer oo ku saabsan Soomaaliya iyo Geeska Afrika

Contact Us:
Email: info@bawaba.africa
Website: https://bawaba.africa
Address: Marinio Rd, Mogadishu, Somalia
Phone: +252628881171

================================
SUBSCRIPTION DETAILS

This email was sent to: ${subscriberEmail}

Manage your subscription:
• Unsubscribe: ${unsubscribeUrl}
• Update preferences: https://bawaba.africa/newsletter

© ${new Date().getFullYear()} بوابة أفريقيا. All rights reserved.
  `.trim()
}
