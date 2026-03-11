'use client'

// Row 1 — skills, each with its own palette accent color
const ROW1: { label: string; color: string }[] = [
  { label: 'PHOTOGRAPHY',    color: 'var(--lavender)' },
  { label: 'GRAPHIC DESIGN', color: 'var(--citrus)' },
  { label: 'VIDEOGRAPHY',    color: 'var(--sunset)' },
  { label: 'WEB DESIGN',     color: 'var(--orange)' },
  { label: 'COPYWRITING',    color: 'var(--mint)' },
  { label: 'MUSIC',          color: 'var(--pink)' },
  { label: 'ILLUSTRATION',   color: 'var(--citrus)' },
  { label: 'BRANDING',       color: 'var(--lavender)' },
  { label: 'SOCIAL MEDIA',   color: 'var(--sunset)' },
  { label: 'PERFORMING ARTS',color: 'var(--mint)' },
]

// Row 2 — value props
const ROW2: { label: string; color: string }[] = [
  { label: 'SKILLZA VERIFIED',        color: 'rgba(255,255,255,.9)' },
  { label: 'EARN WHILE STUDYING',     color: 'var(--citrus)' },
  { label: 'NO PLATFORM FEES',        color: 'rgba(255,255,255,.9)' },
  { label: 'UCT · WITS · AFDA',       color: 'var(--lavender)' },
  { label: 'BOOK IN MINUTES',         color: 'rgba(255,255,255,.9)' },
  { label: 'RATED 4.9 ★',            color: 'var(--sunset)' },
  { label: 'SA STUDENTS',             color: 'rgba(255,255,255,.9)' },
  { label: 'REAL CLIENT REVIEWS',     color: 'var(--mint)' },
  { label: '30% DEPOSIT · BALANCE ON DELIVERY', color: 'rgba(255,255,255,.9)' },
  { label: 'ZERO FRICTION',           color: 'var(--citrus)' },
]

const SEP = <span style={{ padding: '0 32px', opacity: .18, fontSize: '0.6em', lineHeight: 1 }}>◆</span>

export function TickerSection() {
  const r1 = [...ROW1, ...ROW1]
  const r2 = [...ROW2, ...ROW2]

  return (
    <div style={{ background: '#000000', overflow: 'hidden', position: 'relative', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}
      onMouseEnter={e => {
        const tracks = e.currentTarget.querySelectorAll<HTMLElement>('[style*="tickLeft"], [style*="tickRight"]')
        tracks.forEach(t => { t.style.animationPlayState = 'paused' })
      }}
      onMouseLeave={e => {
        const tracks = e.currentTarget.querySelectorAll<HTMLElement>('[style*="tickLeft"], [style*="tickRight"]')
        tracks.forEach(t => { t.style.animationPlayState = 'running' })
      }}
    >

      {/* Row 1 — scrolls left, massive */}
      <div style={{ padding: '18px 0', overflow: 'hidden', position: 'relative' }}>
        {/* Edge fade */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickLeft 22s linear infinite', willChange: 'transform' }}>
          {r1.map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', flexShrink: 0,
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(52px, 7vw, 88px)',
              lineHeight: 1,
              letterSpacing: 3,
              color: item.color,
              paddingRight: 0,
            }}>
              {item.label}
              {SEP}
            </span>
          ))}
        </div>
      </div>

      {/* Thin divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,.06)', margin: '0 24px' }} />

      {/* Row 2 — scrolls right, slightly smaller */}
      <div style={{ padding: '18px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickRight 28s linear infinite', willChange: 'transform' }}>
          {r2.map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', flexShrink: 0,
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              lineHeight: 1,
              letterSpacing: 2,
              color: item.color,
            }}>
              {item.label}
              {SEP}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default TickerSection
