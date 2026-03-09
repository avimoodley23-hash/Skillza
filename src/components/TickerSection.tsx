'use client'
import { SKILLS, SKILL_EMOJIS } from '@/lib/skills'

export function TickerSection() {
  const items = SKILLS.map(s => `${SKILL_EMOJIS[s] ?? '✨'} ${s}`)
  const doubled = [...items, ...items]

  return (
    <div aria-hidden="true" style={{ padding: '18px 0', background: 'var(--orange)', overflow: 'hidden', position: 'relative' }}>
      {/* Edge fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--orange), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--orange), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickRoll 14s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ padding: '0 28px', fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: 2, color: 'rgba(255,255,255,.9)', borderRight: '1px solid rgba(255,255,255,.2)', display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes tickRoll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @media (prefers-reduced-motion: reduce) {
          div[style*="tickRoll"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

export default TickerSection
