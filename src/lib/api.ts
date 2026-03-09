// ── HTML sanitization ─────────────────────────────────────────────────────────
// Escapes user-supplied strings before embedding in email HTML templates.
export function h(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Best-effort: works within a single serverless instance.
// For multi-instance production, swap for Redis/Vercel KV.
const _store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = _store.get(key)
  if (!entry || now > entry.resetAt) {
    _store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}
