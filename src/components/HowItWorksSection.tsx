'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import { MessageCircle } from 'lucide-react'

// Each step gets its own accent color — cobalt, violet, coral
const STEP_ACCENTS = [
  { top: '#1445FF', numColor: 'rgba(20,69,255,.08)', hoverBg: '#0B1C66', badge: null },
  { top: '#7C3AED', numColor: 'rgba(124,58,237,.08)', hoverBg: '#2D1366', badge: 'Connected via WhatsApp' },
  { top: '#FF4520', numColor: 'rgba(255,69,32,.08)', hoverBg: '#5C1A0B', badge: null },
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
        background: '#0F0E0E',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background decorative geometry */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -60, width: 360, height: 360, background: 'radial-gradient(ellipse at center, rgba(255,69,32,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -40, width: 280, height: 280, background: 'radial-gradient(ellipse at center, rgba(124,58,237,.07) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <AnimateIn style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow eyebrow-coral">How It Works</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14, color: '#FAFAF8' }}>
          <SplitText text="Simple for clients." style={{ display: 'block' }} />
          <SplitText text="Fair for students." style={{ display: 'block', color: 'rgba(250,250,248,.55)' }} delay={120} />
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(250,250,248,.5)', maxWidth: 480, marginBottom: 40 }}>
          Browse and book in minutes with no account needed. The deposit system means students always show up, and you are never paying blind.
        </p>
      </AnimateIn>

      <AnimateIn delay={1} style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: 3, borderRadius: 18, overflow: 'hidden', background: 'rgba(255,255,255,.04)' }} className="steps-grid">
        {steps.map((step, idx) => {
          const accent = STEP_ACCENTS[idx]
          return (
            <div
              key={step.num}
              data-accent={idx === 0 ? 'cobalt' : idx === 1 ? 'violet' : 'coral'}
              style={{
                background: '#161514',
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
                el.style.background = '#161514'
              }}
            >
              {/* Colored top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent.top }} />

              {/* Ghost step number */}
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 72, color: accent.numColor, lineHeight: 1, marginBottom: 12, userSelect: 'none' }}>{step.num}</div>

              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: .5, marginBottom: 10, color: '#FAFAF8' }}>{step.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(250,250,248,.55)', lineHeight: 1.75 }}>{step.body}</p>
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

      <AnimateIn delay={2} style={{ position: 'relative', zIndex: 1, marginTop: 28, background: 'rgba(255,69,32,.05)', border: '1px solid rgba(255,69,32,.14)', borderLeft: '3px solid var(--coral)', borderRadius: '0 10px 10px 0', padding: '18px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 6 }}>Phase 1 — How it works right now</div>
        <p style={{ fontSize: 13.5, color: 'rgba(250,250,248,.48)', lineHeight: 1.7 }}>
          Skillza is launching lean. <strong style={{ color: 'rgba(250,250,248,.85)' }}>No login needed to book.</strong> All communication happens via WhatsApp. Deposits go directly between parties via EFT or SnapScan. <strong style={{ color: 'rgba(250,250,248,.85)' }}>Secure in-platform payments and student dashboards are coming in Phase 2.</strong>
        </p>
      </AnimateIn>

      <style>{`
        @media (min-width: 700px) { .steps-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}

export default HowItWorksSection
