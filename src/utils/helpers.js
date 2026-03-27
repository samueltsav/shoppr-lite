/**
 * Format a number as USD currency string
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Truncate text to a given character limit, appending ellipsis
 */
export function truncate(text, limit = 120) {
  if (!text) return ''
  if (text.length <= limit) return text
  return text.slice(0, limit).trimEnd() + '…'
}

/**
 * Estimate reading time from text content
 */
export function readingTime(text) {
  if (!text) return '1 min read'
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

/**
 * Generate a synthetic date offset by post ID (for display purposes)
 */
export function syntheticDate(id) {
  const base = new Date('2025-01-01')
  base.setDate(base.getDate() + (id % 180))
  return base.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Get a label for a category slug
 */
export function categoryLabel(slug, categories) {
  const match = categories.find(c => c.value === slug)
  return match ? match.label : slug
}
