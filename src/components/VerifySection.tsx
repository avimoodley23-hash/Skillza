'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { BadgeCheck, GraduationCap, Zap, Camera } from 'lucide-react'
import type React from 'react'

export function VerifySection() {
  return (
    <section id="verify" style={{ padding: 'clamp(48px, 8vw, 80px) 24px', borderBottom: '1px solid rgba(255,255,255,.06)', background: '#0F0E0E' }} className="verify-section">
      <AnimateIn>
        {/* Lime badge eyebrow */}
        <div style={{ marginBottom: 18 }}>
          <span className="badge-lime">Trust Infrastructure</span>
        </div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14, color: '#FAFAF8' }}>
          Skillza<br />Verified.<br />Full stop.
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(250,250,248,.6)', maxWidth: 480 }}>
          Every creative on Skillza goes through our verification process before their profile goes live. We confirm identity, check credentials, and review their profile — so you always know exactly who you're booking.
        </p>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {(
            [
              { icon: BadgeCheck, title: 'Identity confirmed', body: 'We verify every creative\'s identity before they go live. No anonymous profiles, no fake accounts.' },
              { icon: GraduationCap, title: 'Credentials checked', body: 'We confirm qualifications, institution, or relevant training. You know who trained them and where.' },
              { icon: Zap, title: 'Priority at launch campuses', body: 'UCT, Wits, AFDA, Red & Yellow, ICA. Verified within 24 hours of submission.' },
            ] as { icon: React.ElementType; title: string; body: string }[]
          ).map(vp => (
            <div key={vp.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, background: 'rgba(20,69,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B8FFF' }}>
                <vp.icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2, color: '#FAFAF8' }}>{vp.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(250,250,248,.58)', lineHeight: 1.6 }}>{vp.body}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn delay={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, minHeight: 340, paddingBottom: 32, position: 'relative' }}>
        <div style={{
          width: 'min(285px, 84vw)',
          background: 'linear-gradient(135deg, #1a1a1a, #111)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 18, padding: 22, paddingBottom: 30,
          boxShadow: '0 32px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,74,28,.12)',
          position: 'relative', overflow: 'visible',
          transform: 'rotate(-2deg)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange), var(--lime))', borderRadius: '18px 18px 0 0' }} />
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, letterSpacing: 3, color: 'rgba(250,250,248,.45)', marginBottom: 16, textTransform: 'uppercase' }}>University of Cape Town — Student Services</div>
          <div style={{ display: 'flex', gap: 13, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(20,69,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(20,69,255,.25)', flexShrink: 0, color: '#6B8FFF' }}>
              <Camera size={22} strokeWidth={1.5} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#FAFAF8' }}>Amahle Khumalo</div>
              <div style={{ fontSize: 11, color: 'rgba(250,250,248,.5)', marginTop: 1 }}>BA Visual Communication</div>
              <div style={{ fontSize: 10, color: '#A8FF00', marginTop: 2, fontWeight: 700 }}>3rd Year · 2024</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(250,250,248,.1)', margin: '14px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {[['Student No.', 'UCT2021-4872'], ['Faculty', 'Humanities'], ['Campus', 'Upper Campus'], ['Valid Until', 'Nov 2025']].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(250,250,248,.4)', display: 'block', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#FAFAF8', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
          {/* Skillza Verified stamp — lime */}
          <div style={{
            position: 'absolute', bottom: -22, right: 16,
            width: 64, height: 64,
            background: '#A8FF00',
            border: '2.5px solid #A8FF00',
            borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#0F0E0E', fontSize: 9, fontWeight: 800,
            letterSpacing: .5, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2,
            transform: 'rotate(15deg)',
            boxShadow: '0 0 0 4px #0F0E0E, 0 0 20px rgba(168,255,0,.35)',
            zIndex: 5,
          }}>
            <span style={{ fontSize: 20, display: 'block', marginBottom: 2 }}>✓</span>
            Skillza<br />Verified
          </div>
        </div>
        <div style={{ position: 'absolute', top: 12, right: '10%', background: '#A8FF00', border: 'none', borderRadius: 100, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 7, animation: 'flt 4s ease-in-out infinite', whiteSpace: 'nowrap' }}>
          <div style={{ width: 6, height: 6, background: '#0F0E0E', borderRadius: '50%', animation: 'pdot 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#0F0E0E', letterSpacing: .5 }}>Skillza Verified</span>
        </div>
      </AnimateIn>

      <style>{`
        @media (min-width: 900px) {
          .verify-section { display: grid !important; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding: 80px 52px !important; }
        }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>
    </section>
  )
}

export default VerifySection
