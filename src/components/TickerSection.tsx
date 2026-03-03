'use client'

export function TickerSection() {
  const items = ['📸 Photography', '🎨 Graphic Design', '🎬 Videography', '💄 Makeup Artistry', '🍰 Catering & Baking', '🎵 DJ & Production', '📚 Tutoring', '💻 Web Dev', '👗 Fashion & Styling', '🎭 Performing Arts']
  const doubled = [...items, ...items]

  return (
    <div aria-hidden="true" style={{ padding: '18px 0', background: 'var(--orange)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickRoll 12s linear infinite' }}>
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
