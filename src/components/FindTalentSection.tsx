'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import Link from 'next/link'

export function FindTalentSection() {
  return (
    <section id="find-talent" style={{ borderBottom: '1px solid var(--border)', background: 'var(--black-2)', overflow: 'hidden' }}>
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
        @media (min-width: 900px) {
          .fts-grid { grid-template-columns: 1fr 1fr; }
          .fts-blobs { display: block; }
        }
        @keyframes blobFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-14px); } }
        @keyframes blobFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-10px); } }
        @keyframes blobFloat3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(4px,-8px); } }
        @keyframes blobFloat4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-4px,-12px); } }
        @keyframes blobFloat5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-9px); } }
        @media (prefers-reduced-motion: reduce) {
          .fts-blobs > div { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

export default FindTalentSection
