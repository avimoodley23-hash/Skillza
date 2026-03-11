'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import Link from 'next/link'
import { GraduationCap, Zap, ShieldCheck, Star } from 'lucide-react'
import type React from 'react'

const HIRER_PERKS = [
  { icon: GraduationCap, title: 'Trained for exactly this',    body: 'Mid-degree students at UCT, AFDA, Red & Yellow, Wits and ICA — studying full-time in the skill you need.', bg: '#334ED8', text: '#FFFFFF', sub: 'rgba(255,255,255,.70)' },
  { icon: Zap,           title: 'No account. No friction.',   body: 'Fill a short form, the student contacts you on WhatsApp within 24 hours. Direct, human, no platform in the way.', bg: '#C0F0AA', text: '#1A3A1A', sub: 'rgba(26,58,26,.65)' },
  { icon: ShieldCheck,   title: 'Protected payments',          body: '30% deposit before work starts. Balance only on completion. Scope agreed upfront. Both parties leave verified reviews.', bg: '#FF7144', text: '#FFFFFF', sub: 'rgba(255,255,255,.70)' },
  { icon: Star,          title: 'Fresh work at fair prices',   body: "Lower rates because they're students. The quality isn't. Every job builds their portfolio — they're invested.", bg: '#E0E446', text: '#1A1A00', sub: 'rgba(26,26,0,.65)' },
] as { icon: React.ElementType; title: string; body: string; bg: string; text: string; sub: string }[]

export function FindTalentSection() {
  return (
    <section id="find-talent" style={{ borderBottom: '1px solid var(--border)', background: 'var(--black-2)', overflow: 'hidden', position: 'relative' }}>
      {/* Animated background blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-6%', right: '-5%', width: 300, height: 260, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .26, pointerEvents: 'none', animation: 'ftBlob1 6.4s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '8%', left: '-4%', width: 220, height: 200, background: '#FF7144', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', opacity: .15, pointerEvents: 'none', animation: 'ftBlob2 5.1s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-5%', left: '12%', width: 200, height: 190, background: '#C0F0AA', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', opacity: .22, pointerEvents: 'none', animation: 'ftBlob3 4.7s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '6%', right: '4%', width: 160, height: 160, background: '#E0E446', borderRadius: '30% 70% 60% 40%', opacity: .20, pointerEvents: 'none', animation: 'ftBlob4 3.9s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '48%', left: '40%', width: 120, height: 120, background: '#5BC4F5', borderRadius: '50%', opacity: .14, pointerEvents: 'none', animation: 'ftBlob5 5.5s ease-in-out infinite' }} />

      <div className="fts-grid">

        {/* Left: content */}
        <div style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)', position: 'relative', zIndex: 1 }}>
          <AnimateIn style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="tag-pill tag-blue">Find Talent</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
              <SplitText text="Local talent." style={{ display: 'block' }} />
              <SplitText text="Affordable prices." style={{ display: 'block' }} delay={80} />
              <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)', display: 'block', marginTop: 6 }}>Serious quality.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 500 }}>
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

            {/* Hirer benefit cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 28 }} className="fts-perks">
              {HIRER_PERKS.map(item => {
                const Icon = item.icon
                return (
                  <div key={item.title} style={{ padding: '16px 18px', borderRadius: 14, background: item.bg, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ width: 30, height: 30, flexShrink: 0, background: 'rgba(0,0,0,.09)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.text }}>
                      <Icon size={14} strokeWidth={1.8} />
                    </div>
                    <h4 style={{ fontSize: 12, fontWeight: 700, color: item.text, margin: '0 0 2px', lineHeight: 1.3 }}>{item.title}</h4>
                    <p style={{ fontSize: 11, color: item.sub, lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                  </div>
                )
              })}
            </div>
          </AnimateIn>
        </div>

        {/* Right: colorful blob composition — desktop only */}
        <div className="fts-blobs" aria-hidden="true" style={{ position: 'relative', overflow: 'hidden', minHeight: 300 }}>
          <div style={{ position: 'absolute', top: '10%', left: '16%', width: 152, height: 152, background: '#334ED8', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', animation: 'blobFloat1 5.2s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '5%', left: '55%', width: 112, height: 112, background: '#C0F0AA', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', animation: 'blobFloat2 4.1s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '44%', left: '30%', width: 72, height: 72, background: '#FFA9FF', borderRadius: '50% 50% 70% 30% / 40% 60% 40% 60%', animation: 'blobFloat3 3.6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '18%', left: '8%', width: 124, height: 106, background: '#FF7144', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', animation: 'blobFloat4 6.0s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '8%', left: '48%', width: 110, height: 110, background: '#E0E446', borderRadius: '30% 70% 60% 40% / 50% 40% 60% 50%', animation: 'blobFloat5 4.8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '27%', left: '60%', width: 56, height: 56, background: '#D8E6FF', borderRadius: '70% 30% 50% 50% / 50% 70% 30% 50%', animation: 'blobFloat3 3.3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '38%', left: '42%', width: 40, height: 40, background: '#C7B0FF', borderRadius: '50%', animation: 'blobFloat2 2.9s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        .fts-grid { display: grid; grid-template-columns: 1fr; }
        .fts-blobs { display: none; }
        .fts-perks { grid-template-columns: 1fr 1fr; }
        @media (min-width: 900px) {
          .fts-grid { grid-template-columns: 1fr 1fr; }
          .fts-blobs { display: block; }
        }
        @media (max-width: 499px) {
          .fts-perks { grid-template-columns: 1fr; }
        }
        @keyframes blobFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-14px); } }
        @keyframes blobFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-10px); } }
        @keyframes blobFloat3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(4px,-8px); } }
        @keyframes blobFloat4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-4px,-12px); } }
        @keyframes blobFloat5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-9px); } }
        @keyframes ftBlob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-14px); } }
        @keyframes ftBlob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-10px); } }
        @keyframes ftBlob3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-8px); } }
        @keyframes ftBlob4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-11px); } }
        @keyframes ftBlob5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(4px,-7px); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="ftBlob"] { animation: none !important; }
          .fts-blobs > div { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

export default FindTalentSection
