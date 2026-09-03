import DOMPurify from 'dompurify'

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 's', 'ul', 'ol', 'li', 'a', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
