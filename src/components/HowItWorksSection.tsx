'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import { MessageCircle } from 'lucide-react'

// Each step card gets a bold solid colour — cobalt, lavender, sunset
const STEP_ACCENTS = [
  { bg: '#334ED8', hoverBg: '#2540B8', text: '#FFFFFF', textDim: 'rgba(255,255,255,.68)', numColor: 'rgba(255,255,255,.14)', badge: null },
  { bg: '#C7B0FF', hoverBg: '#B09AE8', text: '#1A0A3A', textDim: 'rgba(26,10,58,.62)',   numColor: 'rgba(26,10,58,.10)',   badge: 'Connected via WhatsApp' },
  { bg: '#FF7144', hoverBg: '#E05A2E', text: '#FFFFFF', textDim: 'rgba(255,255,255,.68)', numColor: 'rgba(255,255,255,.14)', badge: null },
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

      <AnimateIn delay={1} style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: 3, borderRadius: 18, overflow: 'hidden', background: '#111110' }} className="steps-grid">
        {steps.map((step, idx) => {
          const accent = STEP_ACCENTS[idx]
          return (
            <div
              key={step.num}
              style={{
                background: accent.bg,
                padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 36px)',
                transition: 'background .25s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accent.hoverBg }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = accent.bg }}
            >
              {/* Ghost step number */}
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 72, color: accent.numColor, lineHeight: 1, marginBottom: 12, userSelect: 'none' }}>{step.num}</div>

              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: .5, marginBottom: 10, color: accent.text }}>{step.title}</h3>
              <p style={{ fontSize: 13.5, color: accent.textDim, lineHeight: 1.75 }}>{step.body}</p>
              {step.badge && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, background: 'rgba(26,10,58,.08)', border: '1px solid rgba(26,10,58,.22)', color: accent.text, fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 100 }}>
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
