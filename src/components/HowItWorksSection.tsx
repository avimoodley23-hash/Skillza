'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'

export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Browse with confidence', body: "Every profile shows real portfolio work, verified university, transparent pricing tiers, and genuine client reviews. You know exactly who you're booking before you send a message." },
    { num: '02', title: 'No account, no friction', body: 'Fill in a short form with what you need and when. The student reaches out on WhatsApp within 24 hours to confirm scope. Direct, human, no platform in the way.', badge: '📱 Connected via WhatsApp' },
    { num: '03', title: "You're covered the whole way", body: '30% deposit before work starts, via EFT or SnapScan. Balance only on completion. Scope is agreed upfront. Both parties leave verified reviews. No surprises for either side.' },
  ]

  return (
    <section id="how-it-works" className="noise-overlay" style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderBottom: '1px solid var(--border)' }}>
      <AnimateIn>
        <div className="eyebrow">How It Works</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
          <SplitText text="Simple for clients." style={{ display: 'block' }} />
          <SplitText text="Fair for students." style={{ display: 'block' }} delay={120} />
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 480, marginBottom: 40 }}>
          Browse and book in minutes with no account needed. The deposit system means students always show up, and you are never paying blind.
        </p>
      </AnimateIn>

      <AnimateIn delay={1} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, borderRadius: 16, overflow: 'hidden', background: 'var(--border)' }} className="steps-grid">
        {steps.map(step => (
          <div key={step.num} style={{ background: 'var(--black)', padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)', transition: 'background .3s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d0d0d'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--black)'}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: 'rgba(255,255,255,.05)', lineHeight: 1, marginBottom: 14 }}>{step.num}</div>
            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: .5, marginBottom: 8 }}>{step.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{step.body}</p>
            {step.badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.2)', color: '#25d366', fontSize: 11, fontWeight: 600, padding: '5px 11px', borderRadius: 100 }}>
                {step.badge}
              </div>
            )}
          </div>
        ))}
      </AnimateIn>

      <AnimateIn delay={2} style={{ marginTop: 28, background: 'rgba(255,74,28,.04)', border: '1px solid rgba(255,74,28,.1)', borderLeft: '3px solid var(--orange)', borderRadius: '0 10px 10px 0', padding: '18px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Phase 1 — How it works right now</div>
        <p style={{ fontSize: 13.5, color: 'rgba(245,239,227,.5)', lineHeight: 1.7 }}>
          Skillza is launching lean. <strong style={{ color: 'rgba(245,239,227,.8)' }}>No login needed to book.</strong> All communication happens via WhatsApp. Deposits go directly between parties via EFT or SnapScan. <strong style={{ color: 'rgba(245,239,227,.8)' }}>Secure in-platform payments and student dashboards are coming in Phase 2.</strong>
        </p>
      </AnimateIn>

      <style>{`
        @media (min-width: 700px) { .steps-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}

export default HowItWorksSection
