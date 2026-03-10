'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import { GraduationCap, CircleDollarSign, ShieldCheck, CircleCheck } from 'lucide-react'
import type React from 'react'

// Multi-color icon accents per feature — aligned to design system palette
const FEATURE_ACCENTS = [
  { bg: 'rgba(51,78,216,.1)',   color: '#334ED8', border: 'rgba(51,78,216,.22)'   }, // cobalt
  { bg: 'rgba(199,176,255,.1)', color: '#C7B0FF', border: 'rgba(199,176,255,.22)'  }, // lavender
  { bg: 'rgba(224,228,70,.1)',  color: '#C8CC28', border: 'rgba(224,228,70,.22)'   }, // citrus
  { bg: 'rgba(255,113,68,.1)',  color: '#FF7144', border: 'rgba(255,113,68,.22)'   }, // coral
]

export function FindTalentSection() {
  const features: { icon: React.ElementType; title: string; body: string }[] = [
    { icon: GraduationCap,     title: "Trained at SA's best creative institutions", body: "These aren't hobbyists. They spend every day studying and practising the exact skill you need." },
    { icon: CircleDollarSign,  title: "Honest prices, not agency markups",           body: "You pay for the skill, not a layer of account managers and overhead. Rates are set by the students themselves." },
    { icon: ShieldCheck,       title: "Skillza Verified. You know who's coming.",    body: "Every creative goes through our verification process before their profile goes live. Real people, real credentials, no guesswork." },
    { icon: CircleCheck,       title: "Protected from the first rand",               body: "A 30% deposit locks in the booking. You don't pay in full upfront, and students don't work without commitment." },
  ]

  return (
    <section id="browse-talent" style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, background: 'radial-gradient(ellipse at center, rgba(51,78,216,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, left: -60, width: 320, height: 320, background: 'radial-gradient(ellipse at center, rgba(199,176,255,.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: 'var(--black-2)', position: 'relative', zIndex: 1 }} className="find-talent-inner">

        {/* Left */}
        <AnimateIn style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tag-pill tag-blue">Find Talent</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
            <SplitText text="Local talent." style={{ display: 'block' }} />
            <SplitText text="Affordable prices." style={{ display: 'block' }} delay={80} />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)', display: 'block', marginTop: 6 }}>Serious quality.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 480 }}>
            Mid-degree students at UCT, AFDA, Red &amp; Yellow, Wits and ICA. Trained full-time in exactly what you need. Lower prices because they&apos;re students. The quality isn&apos;t.
          </p>

          {/* Multi-color stat strip */}
          <div style={{ marginTop: 24, display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
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

          <div style={{ marginTop: 24, background: 'rgba(51,78,216,.05)', border: '1px solid rgba(51,78,216,.12)', borderLeft: '3px solid var(--orange)', borderRadius: '0 14px 14px 0', padding: 22 }}>
            <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 15.5, lineHeight: 1.65, color: 'var(--cream)', marginBottom: 12 }}>
              &ldquo;You&apos;re getting someone who trained for this, who wants to add your project to their portfolio, and who is going to show up and do their absolute best. That motivation is worth everything.&rdquo;
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Why Skillza Works for Clients</p>
          </div>
        </AnimateIn>

        {/* Right — multi-color feature list */}
        <AnimateIn delay={1} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {features.map((f, i) => (
            <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, flexShrink: 0, borderRadius: 10,
                background: FEATURE_ACCENTS[i].bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: FEATURE_ACCENTS[i].color,
                border: `1px solid ${FEATURE_ACCENTS[i].border}`,
              }}>
                <f.icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 3, color: 'var(--cream)' }}>{f.title}</h4>
                <p style={{ fontSize: 12.5, lineHeight: 1.65, color: 'var(--cream-dim)' }}>{f.body}</p>
              </div>
            </div>
          ))}
        </AnimateIn>
      </div>

      <style>{`
        .find-talent-inner { display: flex; flex-direction: column; gap: 48px; }
        @media (min-width: 900px) {
          .find-talent-inner {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 72px;
            align-items: center;
            padding: 80px 52px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default FindTalentSection
