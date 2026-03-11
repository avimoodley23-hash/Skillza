'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import Link from 'next/link'

export function FindTalentSection() {
  return (
    <section id="find-talent" style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, background: 'radial-gradient(ellipse at center, rgba(51,78,216,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, left: -60, width: 320, height: 320, background: 'radial-gradient(ellipse at center, rgba(199,176,255,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)', background: 'var(--black-2)', position: 'relative', zIndex: 1, maxWidth: 900 }}>

        <AnimateIn style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tag-pill tag-blue">Find Talent</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
            <SplitText text="Local talent." style={{ display: 'block' }} />
            <SplitText text="Affordable prices." style={{ display: 'block' }} delay={80} />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)', display: 'block', marginTop: 6 }}>Serious quality.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 560 }}>
            Mid-degree students at UCT, AFDA, Red &amp; Yellow, Wits and ICA. Trained full-time in exactly what you need. Lower prices because they&apos;re students. The quality isn&apos;t.
          </p>

          {/* Multi-color stat strip */}
          <div style={{ marginTop: 24, display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', maxWidth: 400 }}>
            {[
              { label: 'SA Universities', value: '5+', accent: 'var(--orange)' },
              { label: 'Creative Skills', value: '9+', accent: 'var(--violet)' },
              { label: 'Avg Rating', value: '4.9★', accent: 'var(--coral)' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: '14px 16px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                background: 'var(--black-3)',
              }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: stat.accent, letterSpacing: .5, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: .8 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <Link href="/#talent-grid" style={{ fontSize: 13, fontWeight: 600, color: 'var(--orange)', textDecoration: 'none' }}>
              No account needed to book — browse available creatives →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default FindTalentSection
