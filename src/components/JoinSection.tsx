'use client'
import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'
import { BorderBeam } from '@/components/BorderBeam'
import { SplitText } from '@/components/SplitText'
import { Banknote, BriefcaseBusiness, TrendingUp, Star } from 'lucide-react'
import type React from 'react'

export function JoinSection() {
  return (
    <section id="for-students" className="noise-overlay" style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: 'linear-gradient(160deg, #1A1510 0%, #16120E 40%, #130F0B 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(200,149,108,.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <AnimateIn>
        <div style={{ color: 'var(--sand)', marginBottom: 14, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 18, height: 1.5, background: 'var(--sand)', display: 'inline-block' }} />
          For Students
        </div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 48 }}>
          <SplitText text="Turn your skills" style={{ display: 'block' }} />
          <SplitText text="into income," style={{ display: 'block' }} delay={80} />
          <br />
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>starting now.</span>
        </h2>
      </AnimateIn>

      <AnimateIn delay={1} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="join-grid">
        <div>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: 'rgba(245,239,227,.6)', marginBottom: 28 }}>
            You are already good at this. People are already asking you to do it. Sometimes for free, sometimes for exposure. <strong style={{ color: 'var(--cream)' }}>Skillza gets you in front of clients who are ready to pay, and makes sure every job you do now builds a career, not just a favour bank.</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(
              [
                { icon: Banknote, title: 'Earn on your own terms', body: 'Pick up jobs when it suits your schedule. A shoot on Saturday, a logo between exams. Real income from skills you are already developing.' },
                { icon: BriefcaseBusiness, title: 'Every job is a real portfolio piece', body: 'Work a paying client briefed, approved and vouched for. That is what gets you hired after graduation.' },
                { icon: TrendingUp, title: "The experience your degree doesn't teach", body: 'Managing client expectations, delivering under pressure, handling real feedback. Ten jobs teaches you more than a semester of theory.' },
                { icon: Star, title: 'A track record that survives graduation', body: 'Your reviews and completed jobs do not disappear when you leave. They travel with you into every interview and every pitch.' },
              ] as { icon: React.ElementType; title: string; body: string }[]
            ).map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, flexShrink: 0, background: 'var(--o-dim)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--cream)', marginBottom: 1 }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: 'rgba(245,239,227,.45)', lineHeight: 1.5 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <Link href="/join" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '18px 28px', display: 'flex', position: 'relative', overflow: 'hidden' }}>
              Join the Waitlist →
              <BorderBeam colorFrom="rgba(255,74,28,0)" colorTo="rgba(255,200,100,0.9)" duration={2.4} />
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
            Free to list forever. Skillza verification required before your profile goes live.
          </p>
        </div>
      </AnimateIn>

      <style>{`
        @media (min-width: 900px) {
          .join-grid { grid-template-columns: 1fr 1fr !important; gap: 72px !important; align-items: start; }
        }
      `}</style>
    </section>
  )
}

export default JoinSection
