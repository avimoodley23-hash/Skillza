'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import { MessageCircle } from 'lucide-react'

// Each step gets its own accent color — cobalt, violet, coral
const STEP_ACCENTS = [
  { top: '#1445FF', numColor: 'rgba(20,69,255,.1)',    hoverBg: 'rgba(20,69,255,.07)',   badge: null },
  { top: '#7C3AED', numColor: 'rgba(124,58,237,.1)',  hoverBg: 'rgba(124,58,237,.06)', badge: 'Connected via WhatsApp' },
  { top: '#FF4520', numColor: 'rgba(255,69,32,.1)',   hoverBg: 'rgba(255,69,32,.06)',  badge: null },
]

export function HowItWorksSection() {
  const steps: { num: string; title: string; body: string; badge?: string }[] = [
    { num: '01', title: 'Browse with confidence', body: "Every profile shows real portfolio work, verified university, transparent pricing tiers, and genuine client reviews. You know exactly who you're booking before you send a message." },
    { num: '02', title: 'No account, no friction', body: 'Fill in a short form with what you need and when. The student reaches out on WhatsApp within 24 hours to confirm scope. Direct, human, no platform in the way.', badge: 'Connected via WhatsApp' },
    { num: '03', title: "You're covered the whole way", body: '30% deposit before work starts, via EFT or SnapScan. Balance only on completion. Scope is agreed upfront. Both parties leave verified reviews. No surprises for either side.' },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        padding: 'clamp(56px, 9vw, 96px) 24px',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        background: 'var(--black)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background decorative geometry */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -60, width: 360, height: 360, background: 'radial-gradient(ellipse at center, rgba(255,69,32,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -40, width: 280, height: 280, background: 'radial-gradient(ellipse at center, rgba(124,58,237,.07) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <AnimateIn style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow eyebrow-coral">How It Works</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14, color: '#111110' }}>
          <SplitText text="Simple for clients." style={{ display: 'block' }} />
          <SplitText text="Fair for students." style={{ display: 'block', color: 'rgba(17,17,16,.52)' }} delay={120} />
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(17,17,16,.52)', maxWidth: 480, marginBottom: 40 }}>
          Browse and book in minutes. No account needed, no guesswork. The deposit system protects both sides.
        </p>
      </AnimateIn>

      <AnimateIn delay={1} style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: 3, borderRadius: 18, overflow: 'hidden', background: 'rgba(0,0,0,.08)' }} className="steps-grid">
        {steps.map((step, idx) => {
          const accent = STEP_ACCENTS[idx]
          return (
            <div
              key={step.num}
              data-accent={idx === 0 ? 'cobalt' : idx === 1 ? 'violet' : 'coral'}
              style={{
                background: '#FFFFFF',
                padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 36px)',
                transition: 'background .3s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = accent.hoverBg
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#FFFFFF'
              }}
            >
              {/* Colored top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent.top }} />

              {/* Ghost step number */}
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 72, color: accent.numColor, lineHeight: 1, marginBottom: 12, userSelect: 'none' }}>{step.num}</div>

              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: .5, marginBottom: 10, color: '#111110' }}>{step.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(17,17,16,.6)', lineHeight: 1.75 }}>{step.body}</p>
              {step.badge && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.2)', color: '#25d366', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 100 }}>
                  <MessageCircle size={13} strokeWidth={1.5} />
                  {step.badge}
                </div>
              )}
            </div>
          )
        })}
      </AnimateIn>

      <style>{`
        @media (min-width: 700px) { .steps-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}

export default HowItWorksSection
