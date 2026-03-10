'use client'
import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'
import { BorderBeam } from '@/components/BorderBeam'
import { Banknote, BriefcaseBusiness, TrendingUp, Star, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react'
import type React from 'react'

const PERKS = [
  { icon: Banknote,          title: 'Earn on your own terms',                 body: 'Pick up jobs around your schedule — a shoot on Saturday, a logo between exams.' },
  { icon: BriefcaseBusiness, title: 'Every job is a real portfolio piece',     body: 'Paying clients, real briefs, real deliverables. The kind of work that gets you hired after graduation.' },
  { icon: TrendingUp,        title: "Experience your degree can't teach",      body: 'Client management, pressure, real feedback. Ten jobs teaches more than a semester of theory.' },
  { icon: Star,              title: 'A track record that survives graduation', body: 'Your reviews stick around — they travel into every interview and pitch after you leave.' },
] as { icon: React.ElementType; title: string; body: string }[]

export function JoinSection() {
  return (
    <section
      id="for-students"
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid rgba(255,255,255,.07)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Lime glow — top left */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -120, left: -80, width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(224,228,70,.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Blue glow — bottom right */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, right: -60, width: 400, height: 400, background: 'radial-gradient(ellipse at center, rgba(51,78,216,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* ── Top: headline band ── */}
      <AnimateIn style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 80px) 0',
        maxWidth: 1200, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: 3,
            textTransform: 'uppercase', color: 'var(--lime)',
            padding: '5px 12px', borderRadius: 100,
            border: '1px solid rgba(224,228,70,.3)',
            background: 'rgba(224,228,70,.08)',
          }}>For Students</span>
        </div>

        <div style={{ display: 'grid', gap: 'clamp(20px, 4vw, 52px)' }} className="join-top-grid">
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(52px, 9vw, 104px)',
            lineHeight: .88,
            letterSpacing: 1,
            color: '#FAFAF8',
            margin: 0,
          }}>
            Turn your skills<br />
            <span style={{ color: 'var(--lime)', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(44px, 7.5vw, 88px)' }}>into income.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.75,
            color: 'rgba(250,250,248,.55)',
            maxWidth: 480,
            margin: 0,
            alignSelf: 'end',
          }}>
            You&apos;re already good at this — people are already asking. Skillza puts you in front of{' '}
            <span style={{ color: '#FAFAF8', fontWeight: 600 }}>clients who are ready to pay</span>{' '}
            and turns every job into a career-building moment.
          </p>
        </div>
      </AnimateIn>

      {/* ── Bottom: perks + CTA ── */}
      <AnimateIn delay={1} style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 80px) clamp(56px, 8vw, 96px)',
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gap: 'clamp(32px, 5vw, 64px)',
      }} className="join-bottom-grid">

        {/* Perks grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }} className="join-perks">
          {PERKS.map((item, i) => {
            const Icon = item.icon
            const isLime = i % 2 === 0
            return (
              <div key={item.title} style={{
                padding: '20px 22px',
                borderRadius: 16,
                background: 'rgba(255,255,255,.03)',
                border: `1px solid ${isLime ? 'rgba(224,228,70,.12)' : 'rgba(255,255,255,.07)'}`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  width: 36, height: 36, flexShrink: 0,
                  background: isLime ? 'rgba(224,228,70,.12)' : 'rgba(255,255,255,.07)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isLime ? 'var(--lime)' : 'rgba(255,255,255,.65)',
                }}>
                  <Icon size={17} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FAFAF8', marginBottom: 5, lineHeight: 1.3 }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,.48)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA block */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {([
              { icon: GraduationCap, text: 'UCT, AFDA, Red & Yellow, Wits, ICA' },
              { icon: ShieldCheck,   text: 'Verified within 24 hours of submission' },
              { icon: Banknote,      text: 'You keep 100% of what you charge' },
            ] as { icon: React.FC<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>, text: string }[]).map(item => {
              const Icon = item.icon
              return (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={14} strokeWidth={1.8} style={{ color: 'var(--lime)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>{item.text}</span>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href="/join"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'var(--lime)', color: '#111',
                fontWeight: 800, fontSize: 15, letterSpacing: .3,
                padding: '16px 28px', borderRadius: 100,
                textDecoration: 'none', width: 'fit-content',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(224,228,70,.22)',
              }}
            >
              Join the Waitlist
              <ArrowRight size={16} strokeWidth={2.5} />
              <BorderBeam colorFrom="rgba(224,228,70,0)" colorTo="rgba(255,255,255,0.6)" duration={2.4} />
            </Link>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', lineHeight: 1.6, margin: 0 }}>
              Free to list forever. Skillza verification required before your profile goes live.
            </p>
          </div>
        </div>
      </AnimateIn>

      <style>{`
        @media (min-width: 860px) {
          .join-top-grid    { grid-template-columns: 1fr 1fr !important; align-items: end; }
          .join-bottom-grid { grid-template-columns: 1fr 1fr !important; align-items: start; }
        }
        @media (max-width: 560px) {
          .join-perks { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default JoinSection
