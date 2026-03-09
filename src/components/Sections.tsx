'use client'
import Link from 'next/link'

// ── FIND TALENT SECTION ──────────────────────────────────────
export function FindTalentSection() {
  const features = [
    { icon: '🎓', title: "Trained at SA's best creative institutions", body: "These aren't hobbyists. They spend every day studying and practising the exact skill you need." },
    { icon: '💰', title: "Honest prices, not agency markups", body: "You pay for the skill, not a layer of account managers and overhead. Rates are set by the students themselves." },
    { icon: '✅', title: "Skillza Verified. You know who's coming.", body: "Every creative goes through our verification process before their profile goes live. Real people, real credentials, no guesswork." },
    { icon: '🔒', title: "Protected from the first rand", body: "A 30% deposit locks in the booking. You don't pay in full upfront, and students don't work without commitment." },
  ]

  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: 'var(--black-2)' }} className="find-talent-inner">
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tag-pill tag-blue">🎯 Find Talent</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
            Local talent.<br />Affordable prices.<br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--blue)' }}>Serious quality.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(245,239,227,.6)', maxWidth: 480 }}>
            Mid-degree students at UCT, AFDA, Red &amp; Yellow, Wits and ICA. Trained full-time in exactly what you need. Lower prices because they're students. The quality isn't.
          </p>
          <div style={{ marginTop: 28, background: 'var(--card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)', borderRadius: '0 14px 14px 0', padding: 22 }}>
            <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.65, color: 'rgba(245,239,227,.8)', marginBottom: 12 }}>
              "You're getting someone who trained for this, who wants to add your project to their portfolio, and who is going to show up and do their absolute best. That motivation is worth everything."
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Why Skillza Works for Clients</p>
          </div>
        </div>

        {/* Right — features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 9, background: 'var(--b-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{f.icon}</div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{f.title}</h4>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'rgba(245,239,227,.5)' }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .find-talent-inner {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
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

// ── TICKER ───────────────────────────────────────────────────
export function TickerSection() {
  const items = ['📸 Photography', '🎨 Graphic Design', '🎬 Videography', '💄 Makeup Artistry', '🍰 Catering & Baking', '🎵 DJ & Production', '📚 Tutoring', '💻 Web Dev', '👗 Fashion & Styling', '🎭 Performing Arts']
  const doubled = [...items, ...items]

  return (
    <div aria-hidden="true" style={{ padding: '18px 0', background: 'var(--orange)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickRoll 12s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ padding: '0 28px', fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: 2, color: 'rgba(255,255,255,.9)', borderRight: '1px solid rgba(255,255,255,.2)', display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes tickRoll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @media (prefers-reduced-motion: reduce) {
          div[style*="tickRoll"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

// ── HOW IT WORKS ─────────────────────────────────────────────
export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Browse with confidence', body: 'Every profile shows real portfolio work, verified university, transparent pricing tiers, and genuine client reviews. You know exactly who you\'re booking before you send a message.' },
    { num: '02', title: 'No account, no friction', body: 'Fill in a short form with what you need and when. The student reaches out on WhatsApp within 24 hours to confirm scope. Direct, human, no platform in the way.', badge: '📱 Connected via WhatsApp' },
    { num: '03', title: "You're covered the whole way", body: '30% deposit before work starts, via EFT or SnapScan. Balance only on completion. Scope is agreed upfront. Both parties leave verified reviews. No surprises for either side.' },
  ]

  return (
    <section id="how-it-works" style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderBottom: '1px solid var(--border)' }}>
      <div className="eyebrow">How It Works</div>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
        Simple for clients.<br />Fair for students.
      </h2>
      <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 480, marginBottom: 40 }}>
        Browse and book in minutes with no account needed. The deposit system means students always show up, and you're never paying blind.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, borderRadius: 16, overflow: 'hidden', background: 'var(--border)' }} className="steps-grid">
        {steps.map(step => (
          <div key={step.num} style={{ background: 'var(--black)', padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)', transition: 'background .3s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d0d0d'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--black)'}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: 'rgba(255,255,255,.05)', lineHeight: 1, marginBottom: 14 }}>{step.num}</div>
            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: .5, marginBottom: 8 }}>{step.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{step.body}</p>
            {step.badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.2)', color: '#25d366', fontSize: 11, fontWeight: 600, padding: '5px 11px', borderRadius: 100 }}>
                {step.badge}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, background: 'rgba(255,74,28,.04)', border: '1px solid rgba(255,74,28,.1)', borderLeft: '3px solid var(--orange)', borderRadius: '0 10px 10px 0', padding: '18px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Phase 1 — How it works right now</div>
        <p style={{ fontSize: 13.5, color: 'rgba(245,239,227,.5)', lineHeight: 1.7 }}>
          Skillza is launching lean. <strong style={{ color: 'rgba(245,239,227,.8)' }}>No login needed to book.</strong> All communication happens via WhatsApp. We make the introduction, you handle the rest. Deposits go directly between parties via EFT or SnapScan. <strong style={{ color: 'rgba(245,239,227,.8)' }}>Secure in-platform payments and student dashboards are coming in Phase 2.</strong>
        </p>
      </div>

      <style>{`
        @media (min-width: 700px) { .steps-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}

// ── VERIFICATION ─────────────────────────────────────────────
export function VerifySection() {
  return (
    <section id="verify" style={{ padding: 'clamp(48px, 8vw, 80px) 24px', borderBottom: '1px solid var(--border)' }} className="verify-section">
      <div>
        <div className="eyebrow">Trust Infrastructure</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
          Skillza<br />Verified.<br />Full stop.
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'rgba(245,239,227,.6)', maxWidth: 480 }}>
          Every creative on Skillza goes through our verification process before their profile goes live. We confirm identity, check credentials, and review their profile — so you always know exactly who you're booking.
        </p>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { icon: '🪪', title: 'Identity confirmed', body: 'We verify every creative\'s identity before they go live. No anonymous profiles, no fake accounts.' },
            { icon: '🎓', title: 'Credentials checked', body: 'We confirm qualifications, institution, or relevant training. You know who trained them and where.' },
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

      {/* Student card mockup */}
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
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid rgba(255,255,255,.07)', flexShrink: 0 }}>🎬</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--cream)' }}>Amahle Khumalo</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>BA Film & Media Production</div>
              <div style={{ fontSize: 10, color: 'var(--orange)', marginTop: 2, fontWeight: 600 }}>3rd Year · 2025</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,.06)', margin: '14px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {[['Student No.', 'UCT2023-0841'], ['Faculty', 'Humanities'], ['Campus', 'Upper Campus'], ['Valid Until', 'Nov 2026']].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--cream)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
          {/* Verified stamp */}
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
        {/* Float badge */}
        <div style={{ position: 'absolute', top: 12, right: '10%', background: 'var(--black)', border: '1px solid var(--green)', borderRadius: 10, padding: '9px 15px', display: 'flex', alignItems: 'center', gap: 7, animation: 'flt 4s ease-in-out infinite', whiteSpace: 'nowrap' }}>
          <div style={{ width: 7, height: 7, background: 'var(--green)', borderRadius: '50%', animation: 'pdot 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>Skillza Verified</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .verify-section { display: grid !important; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding: 80px 52px !important; }
        }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @media (prefers-reduced-motion: reduce) {
          div[style*="flt"], div[style*="pdot"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

// ── JOIN SECTION ─────────────────────────────────────────────
export function JoinSection() {
  return (
    <section id="for-students" style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: 'linear-gradient(160deg, #1A1510 0%, #16120E 40%, #130F0B 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(200,149,108,.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ color: 'var(--sand)', marginBottom: 14, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 18, height: 1.5, background: 'var(--sand)', display: 'inline-block' }} />
        For Students
      </div>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 48 }}>
        Turn your skills<br />into income,<br />
        <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>starting now.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="join-grid">
        <div>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: 'rgba(245,239,227,.6)', marginBottom: 28 }}>
            You're already good at this. People are already asking you to do it. Sometimes for free, sometimes for "exposure". <strong style={{ color: 'var(--cream)' }}>Skillza gets you in front of clients who are ready to pay, and makes sure every job you do now builds a career, not just a favour bank.</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '💸', title: 'Earn on your own terms', body: 'Pick up jobs when it suits your schedule. A shoot on Saturday, a logo between exams. Real income from skills you\'re already developing.' },
              { icon: '📁', title: 'Every job is a real portfolio piece', body: 'Work a paying client briefed, approved and vouched for. That\'s what gets you hired after graduation.' },
              { icon: '🔨', title: "The experience your degree doesn't teach", body: 'Managing client expectations, delivering under pressure, handling real feedback. Ten jobs teaches you more than a semester of theory.' },
              { icon: '⭐', title: 'A track record that survives graduation', body: 'Your reviews and completed jobs don\'t disappear when you leave. They travel with you into every interview and every pitch.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, flexShrink: 0, background: 'var(--o-dim)', borderRadius: 9, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--cream)', marginBottom: 1 }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: 'rgba(245,239,227,.45)', lineHeight: 1.5 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Link href="/join" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '18px 28px', marginBottom: 16, display: 'flex' }}>
            Join the Waitlist →
          </Link>
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
            Free to list forever. Skillza verification required before your profile goes live.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .join-grid { grid-template-columns: 1fr 1fr !important; gap: 72px !important; align-items: start; }
        }
      `}</style>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ padding: '48px 24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 3, marginBottom: 8 }}>
        SKILL<span style={{ color: 'var(--orange)' }}>ZA</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Where SA students get paid to do what they love.</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <Link href="/privacy" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Privacy Policy</Link>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <Link href="/terms" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Terms of Service</Link>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <a href="mailto:hello@skillza.co.za" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>hello@skillza.co.za</a>
      </div>
      <p style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 8px', lineHeight: 1.6 }}>
        Skillza is a marketplace platform. We verify student enrolment but do not supervise bookings or guarantee outcomes. Use good judgment when meeting in person.
      </p>
      <p style={{ fontSize: 11, color: 'var(--muted)' }}>© 2026 Skillza. Built for SA students. POPIA compliant.</p>
    </footer>
  )
}
