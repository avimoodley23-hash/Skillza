'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { BadgeCheck, GraduationCap, Zap, Camera } from 'lucide-react'
import type React from 'react'

export function VerifySection() {
  return (
    <section
      id="verify"
      style={{
        padding: 'clamp(48px, 8vw, 80px) 24px',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        background: '#0A090A',
        position: 'relative', overflow: 'hidden',
      }}
      className="verify-section"
    >
      <div aria-hidden="true" style={{ position: 'absolute', top: -100, left: -80, width: 480, height: 480, background: 'radial-gradient(ellipse at center, rgba(124,58,237,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, right: -40, width: 300, height: 300, background: 'radial-gradient(ellipse at center, rgba(170,255,0,.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <AnimateIn style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 18 }}>
          <span className="badge-violet">Trust Infrastructure</span>
        </div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14, color: '#FAFAF8' }}>
          Skillza<br />
          <span style={{ color: 'var(--violet)' }}>Verified.</span><br />
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'rgba(250,250,248,.4)', fontSize: 'clamp(26px, 4.5vw, 48px)' }}>Full stop.</span>
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(250,250,248,.55)', maxWidth: 480 }}>
          Every creative on Skillza goes through our verification process before their profile goes live. We confirm identity, check credentials, and review their profile so you always know exactly who you are booking.
        </p>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {(
            [
              { icon: BadgeCheck,    title: 'Identity confirmed',          body: "We verify every creative's identity before they go live. No anonymous profiles, no fake accounts.",        color: '#A78BFA' },
              { icon: GraduationCap, title: 'Credentials checked',         body: 'We confirm qualifications, institution, or relevant training. You know who trained them and where.',       color: '#C4B5FD' },
              { icon: Zap,           title: 'Priority at launch campuses', body: 'UCT, Wits, AFDA, Red and Yellow, ICA. Verified within 24 hours of submission.',                           color: 'var(--lime)' },
            ] as { icon: React.ElementType; title: string; body: string; color: string }[]
          ).map(vp => (
            <div key={vp.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 10, background: 'rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <vp.icon size={18} strokeWidth={1.5} style={{ color: vp.color }} />
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2, color: '#FAFAF8' }}>{vp.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(250,250,248,.52)', lineHeight: 1.65 }}>{vp.body}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn delay={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, minHeight: 340, paddingBottom: 32, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 'min(290px, 84vw)',
          background: 'linear-gradient(160deg, #1C1525 0%, #130F1A 100%)',
          border: '1px solid rgba(124,58,237,.3)',
          borderRadius: 20, padding: 22, paddingBottom: 32,
          boxShadow: '0 32px 64px rgba(0,0,0,.6), 0 0 0 1px rgba(124,58,237,.2)',
          position: 'relative', overflow: 'visible',
          transform: 'rotate(-2deg)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--violet), var(--lime))', borderRadius: '20px 20px 0 0' }} />
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, letterSpacing: 3, color: 'rgba(250,250,248,.38)', marginBottom: 16, textTransform: 'uppercase' }}>University of Cape Town</div>
          <div style={{ display: 'flex', gap: 13, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(124,58,237,.3)', flexShrink: 0 }}>
              <Camera size={22} strokeWidth={1.5} style={{ color: '#A78BFA' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#FAFAF8' }}>Amahle Khumalo</div>
              <div style={{ fontSize: 11, color: 'rgba(250,250,248,.48)', marginTop: 1 }}>BA Visual Communication</div>
              <div style={{ fontSize: 10, color: 'var(--lime)', marginTop: 2, fontWeight: 700 }}>3rd Year · 2024</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(124,58,237,.2)', margin: '14px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {[['Student No.', 'UCT2021-4872'], ['Faculty', 'Humanities'], ['Campus', 'Upper Campus'], ['Valid Until', 'Nov 2025']].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(250,250,248,.35)', display: 'block', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#FAFAF8', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{
            position: 'absolute', bottom: -22, right: 16,
            width: 66, height: 66,
            background: 'var(--lime)', border: '3px solid #0A090A',
            borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#0B0B0A', fontSize: 9, fontWeight: 900,
            letterSpacing: .5, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2,
            transform: 'rotate(15deg)',
            boxShadow: '0 0 0 4px #0A090A, 0 0 24px rgba(170,255,0,.4)',
            zIndex: 5,
          }}>
            <span style={{ fontSize: 22, display: 'block', marginBottom: 1, lineHeight: 1 }}>✓</span>
            Skillza<br />Verified
          </div>
        </div>

        <div style={{
          position: 'absolute', top: 12, right: '8%',
          background: 'var(--violet)',
          borderRadius: 100, padding: '9px 18px',
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'flt 4s ease-in-out infinite', whiteSpace: 'nowrap',
          boxShadow: '0 4px 20px rgba(124,58,237,.4)',
        }}>
          <div style={{ width: 7, height: 7, background: 'rgba(255,255,255,.9)', borderRadius: '50%', animation: 'pdot 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: .5 }}>Skillza Verified</span>
        </div>
      </AnimateIn>

      <style>{`
        @media (min-width: 900px) {
          .verify-section { display: grid !important; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding: 80px 52px !important; }
        }
        @keyframes flt  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>
    </section>
  )
}

export default VerifySection
