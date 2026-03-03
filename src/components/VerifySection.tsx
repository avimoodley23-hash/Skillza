'use client'

export function VerifySection() {
  return (
    <section id="verify" style={{ padding: 'clamp(48px, 8vw, 80px) 24px', borderBottom: '1px solid var(--border)' }} className="verify-section">
      <div>
        <div className="eyebrow">Trust Infrastructure</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
          Student Card<br />Verified.<br />Full stop.
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(245,239,227,.6)', maxWidth: 480 }}>
          Every provider uploads their university student card before their profile goes live. Your university already did the hard ID work. We make that trust visible to clients.
        </p>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { icon: '🎓', title: 'University-backed identity', body: 'Student cards require enrolment verification to issue. Every provider is a real, currently enrolled student at a recognised SA institution.' },
            { icon: '🔒', title: 'Safe for clients. Credibility for students.', body: 'Clients know who they are booking. Students get a verified badge that signals professionalism before they have said a word.' },
            { icon: '⚡', title: 'Priority at launch campuses', body: 'UCT, Wits, AFDA, Red & Yellow, ICA. Verified within 24 hours of submission.' },
          ].map(vp => (
            <div key={vp.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, background: 'var(--o-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{vp.icon}</div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{vp.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{vp.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, minHeight: 340, paddingBottom: 32, position: 'relative' }}>
        <div style={{
          width: 'min(285px, 84vw)',
          background: 'linear-gradient(135deg, #1a1a1a, #111)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 18, padding: 22, paddingBottom: 30,
          boxShadow: '0 32px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,74,28,.12)',
          position: 'relative', overflow: 'visible',
          transform: 'rotate(-2deg)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange), var(--gold))', borderRadius: '18px 18px 0 0' }} />
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase' }}>University of Cape Town — Student Services</div>
          <div style={{ display: 'flex', gap: 13, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid rgba(255,255,255,.07)', flexShrink: 0 }}>📸</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--cream)' }}>Amahle Khumalo</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>BA Visual Communication</div>
              <div style={{ fontSize: 10, color: 'var(--orange)', marginTop: 2, fontWeight: 600 }}>3rd Year · 2024</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,.06)', margin: '14px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {[['Student No.', 'UCT2021-4872'], ['Faculty', 'Humanities'], ['Campus', 'Upper Campus'], ['Valid Until', 'Nov 2025']].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--cream)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{
            position: 'absolute', bottom: -22, right: 16,
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #0d1a12, #0a1a10)',
            border: '2.5px solid var(--green)',
            borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: 'var(--green)', fontSize: 9, fontWeight: 700,
            letterSpacing: .5, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2,
            transform: 'rotate(15deg)',
            boxShadow: '0 0 0 4px var(--black), 0 0 20px rgba(52,213,142,.2)',
            zIndex: 5,
          }}>
            <span style={{ fontSize: 20, display: 'block', marginBottom: 2 }}>✓</span>
            Skillza<br />Verified
          </div>
        </div>
        <div style={{ position: 'absolute', top: 12, right: '10%', background: 'var(--black)', border: '1px solid var(--green)', borderRadius: 10, padding: '9px 15px', display: 'flex', alignItems: 'center', gap: 7, animation: 'flt 4s ease-in-out infinite', whiteSpace: 'nowrap' }}>
          <div style={{ width: 7, height: 7, background: 'var(--green)', borderRadius: '50%', animation: 'pdot 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>Student Card Verified</span>
        </div>
      </div>

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
