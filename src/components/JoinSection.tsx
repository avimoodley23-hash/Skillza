'use client'
import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'
import { Banknote, BriefcaseBusiness, TrendingUp, Star, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react'
import type React from 'react'

const PERKS = [
  { icon: Banknote,          title: 'Earn on your schedule',        body: 'Pick up jobs around exams — a shoot on Saturday, a logo between lectures.', bg: '#334ED8', text: '#FFFFFF', sub: 'rgba(255,255,255,.70)' },
  { icon: BriefcaseBusiness, title: 'Real portfolio pieces',         body: 'Paying clients, real briefs. The kind of work that gets you hired after graduation.', bg: '#C0F0AA', text: '#1A3A1A', sub: 'rgba(26,58,26,.65)' },
  { icon: TrendingUp,        title: 'Beyond your degree',           body: 'Client management, real feedback. Ten jobs teaches more than a semester of theory.', bg: '#FFE8D2', text: '#2A1200', sub: 'rgba(42,18,0,.58)' },
  { icon: Star,              title: 'Reviews that outlast uni',      body: 'Your track record travels into every interview and pitch after you leave.', bg: '#E0E446', text: '#1A1A00', sub: 'rgba(26,26,0,.60)' },
] as { icon: React.ElementType; title: string; body: string; bg: string; text: string; sub: string }[]

export function JoinSection() {
  return (
    <section
      id="for-students"
      style={{
        background: '#FAFAF6',
        borderTop: '1px solid rgba(0,0,0,.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blob decorations */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-8%', left: '-6%', width: 300, height: 260, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .28, pointerEvents: 'none', animation: 'joinBlob1 6.4s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '5%', right: '-4%', width: 240, height: 220, background: '#334ED8', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', opacity: .12, pointerEvents: 'none', animation: 'joinBlob2 5.1s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-6%', left: '14%', width: 220, height: 200, background: '#FF7144', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', opacity: .18, pointerEvents: 'none', animation: 'joinBlob3 4.7s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '4%', right: '3%', width: 180, height: 180, background: '#C0F0AA', borderRadius: '30% 70% 60% 40% / 50% 40% 60% 50%', opacity: .38, pointerEvents: 'none', animation: 'joinBlob4 3.9s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '52%', left: '38%', width: 140, height: 140, background: '#E0E446', borderRadius: '50% 50% 70% 30% / 40% 60% 40% 60%', opacity: .20, pointerEvents: 'none', animation: 'joinBlob5 5.5s ease-in-out infinite' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ display: 'grid', gap: 'clamp(40px, 6vw, 72px)', alignItems: 'start' }} className="join-layout">

          {/* ── Left: headline + perk cards ── */}
          <AnimateIn style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 3,
                textTransform: 'uppercase', color: '#FFFFFF',
                padding: '5px 12px', borderRadius: 100,
                background: '#111110',
                display: 'inline-block', marginBottom: 20,
              }}>For Students</span>

              <h2 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                lineHeight: .88, letterSpacing: 1,
                color: '#111110', margin: '0 0 16px',
              }}>
                Turn your skills<br />
                <span style={{ color: '#334ED8', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(40px, 6.5vw, 80px)' }}>into income.</span>
              </h2>

              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.75, color: 'rgba(17,17,16,.56)', maxWidth: 460, margin: 0 }}>
                You&apos;re already good at this. People are already asking. Skillza puts you in front of{' '}
                <strong style={{ color: '#111110', fontWeight: 600 }}>clients who are ready to pay</strong>{' '}
                and turns every job into a career-building moment.
              </p>
            </div>

            {/* 2×2 coloured perk cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="join-perks">
              {PERKS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} style={{
                    padding: '18px 20px', borderRadius: 16,
                    background: item.bg,
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    <div style={{
                      width: 34, height: 34, flexShrink: 0,
                      background: 'rgba(0,0,0,.09)', borderRadius: 9,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: item.text,
                    }}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: item.text, margin: '0 0 4px', lineHeight: 1.3 }}>{item.title}</h4>
                    <p style={{ fontSize: 12, color: item.sub, lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                  </div>
                )
              })}
            </div>
          </AnimateIn>

          {/* ── Right: CTA card ── */}
          <AnimateIn delay={1}>
            <div style={{
              background: '#E0E446',
              borderRadius: 24,
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: .95, color: '#111110', marginBottom: 10 }}>
                  Ready to start earning?
                </div>
                <p style={{ fontSize: 14, color: 'rgba(17,17,16,.62)', lineHeight: 1.7, margin: 0 }}>
                  Applications reviewed weekly. Your profile goes live within 24 hours of verification.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {([
                  { icon: GraduationCap, text: 'UCT, AFDA, Red & Yellow, Wits, ICA' },
                  { icon: ShieldCheck,   text: 'Verified within 24 hours' },
                  { icon: Banknote,      text: 'You keep 100% of what you charge' },
                ] as { icon: React.FC<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>, text: string }[]).map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <Icon size={14} strokeWidth={1.8} style={{ color: '#111110', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(17,17,16,.70)', fontWeight: 500 }}>{item.text}</span>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/join"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#111110', color: '#E0E446',
                  fontWeight: 800, fontSize: 15, letterSpacing: .3,
                  padding: '17px 28px', borderRadius: 100,
                  textDecoration: 'none',
                  transition: 'transform .15s ease, box-shadow .15s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'scale(1.03)'
                  el.style.boxShadow = '0 8px 32px rgba(0,0,0,.30)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'scale(1)'
                  el.style.boxShadow = 'none'
                }}
              >
                Join the Waitlist
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>

              <p style={{ fontSize: 11, color: 'rgba(17,17,16,.42)', margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
                Free to list forever. Skillza verification required before your profile goes live.
              </p>
            </div>
          </AnimateIn>

        </div>
      </div>

      <style>{`
        .join-layout { grid-template-columns: 1fr; }
        @media (min-width: 860px) {
          .join-layout { grid-template-columns: 3fr 2fr; }
        }
        @media (max-width: 560px) {
          .join-perks { grid-template-columns: 1fr !important; }
        }
        @keyframes joinBlob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,-16px); } }
        @keyframes joinBlob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-6px,-12px); } }
        @keyframes joinBlob3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-10px); } }
        @keyframes joinBlob4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,-13px); } }
        @keyframes joinBlob5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-8px); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="joinBlob"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

export default JoinSection
