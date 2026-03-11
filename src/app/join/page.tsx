'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { SKILLS } from '@/lib/skills'
import { CheckCircle, ArrowRight, GraduationCap, ShieldCheck, Banknote } from 'lucide-react'

const UNIVERSITIES = ['UCT', 'Wits', 'AFDA', 'Red & Yellow', 'ICA', 'Stellenbosch', 'UJ', 'CPUT', 'Other']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year+', 'Postgrad']

const STEPS = [
  { n: '01', t: 'We review your application', color: '#334ED8' },
  { n: '02', t: 'You get an email with your profile link', color: '#FF7144' },
  { n: '03', t: 'Complete your profile and submit for verification', color: '#C0F0AA' },
  { n: '04', t: 'We verify you and your profile goes live', color: '#E0E446' },
]

export default function JoinPage() {
  const [form, setForm] = useState({ name: '', email: '', university: '', year: '', skill: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.university || !form.skill) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      if (data.error === 'already_on_waitlist') {
        setError("You're already on the waitlist with that email.")
      } else {
        setError('Something went wrong. Please try again.')
      }
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <>
        <Nav />
        <main style={{ minHeight: '100svh', background: '#FAFAF6', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px' }}>
          {/* Background blobs */}
          <div aria-hidden="true" style={{ position: 'absolute', top: '-5%', left: '-8%', width: 360, height: 320, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .25, pointerEvents: 'none', animation: 'jblob1 6.4s ease-in-out infinite' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: '-6%', right: '-6%', width: 300, height: 280, background: '#C0F0AA', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', opacity: .32, pointerEvents: 'none', animation: 'jblob3 4.7s ease-in-out infinite' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: '40%', right: '8%', width: 180, height: 180, background: '#E0E446', borderRadius: '50% 50% 70% 30%', opacity: .22, pointerEvents: 'none', animation: 'jblob4 5.1s ease-in-out infinite' }} />

          <div style={{ maxWidth: 500, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Big celebratory icon */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E0E446', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 8px 32px rgba(224,228,70,.4)' }}>
              <CheckCircle size={36} strokeWidth={2} color="#111110" />
            </div>

            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 8vw, 52px)', letterSpacing: 1, marginBottom: 12, color: '#111110', lineHeight: .95 }}>
              You&apos;re on the list,<br />
              <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#334ED8' }}>{form.name.split(' ')[0]}.</span>
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(17,17,16,.6)', lineHeight: 1.7, marginBottom: 32 }}>
              We&apos;ll review your application and reach out within 48 hours with next steps on setting up your profile.
            </p>

            {/* Steps card */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 20, padding: '24px 28px', marginBottom: 28, textAlign: 'left', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(17,17,16,.4)', marginBottom: 18 }}>What happens next</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {STEPS.map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: step.color, letterSpacing: 1, flexShrink: 0, lineHeight: 1.2 }}>{step.n}</span>
                    <span style={{ fontSize: 14, color: 'rgba(17,17,16,.7)', lineHeight: 1.55 }}>{step.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#111110', color: '#FAFAF6', borderRadius: 100,
              padding: '14px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none',
              transition: 'transform .15s, box-shadow .15s',
            }}>
              Back to Skillza <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </main>
        <style>{bloblStyles}</style>
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100svh', background: '#FAFAF6', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '-4%', left: '-6%', width: 340, height: 300, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .28, pointerEvents: 'none', animation: 'jblob1 6.4s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '8%', right: '-5%', width: 260, height: 240, background: '#334ED8', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', opacity: .11, pointerEvents: 'none', animation: 'jblob2 5.1s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-4%', left: '10%', width: 240, height: 220, background: '#FF7144', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', opacity: .17, pointerEvents: 'none', animation: 'jblob3 4.7s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '8%', right: '4%', width: 200, height: 200, background: '#C0F0AA', borderRadius: '30% 70% 60% 40% / 50% 40% 60% 50%', opacity: .36, pointerEvents: 'none', animation: 'jblob4 3.9s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '42%', width: 160, height: 160, background: '#E0E446', borderRadius: '50% 50% 70% 30% / 40% 60% 40% 60%', opacity: .18, pointerEvents: 'none', animation: 'jblob5 5.5s ease-in-out infinite' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px, 14vw, 136px) 20px 80px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 960, display: 'grid', gap: 'clamp(32px, 6vw, 64px)', alignItems: 'start' }} className="join-page-layout">

            {/* ── Left: Pitch ── */}
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#FFFFFF', padding: '5px 12px', borderRadius: 100, background: '#111110', display: 'inline-block', marginBottom: 20 }}>
                For Students
              </span>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 9vw, 88px)', lineHeight: .88, letterSpacing: 1, marginBottom: 16, color: '#111110' }}>
                Join the<br />
                <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: '#334ED8', fontSize: 'clamp(44px, 7.5vw, 76px)' }}>Waitlist.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(17,17,16,.56)', lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>
                Free to list forever. Launching campus by campus. Get early access when yours goes live.
              </p>

              {/* Mini perk list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {([
                  { icon: GraduationCap, text: 'UCT, AFDA, Red & Yellow, Wits, ICA', color: '#334ED8' },
                  { icon: ShieldCheck,   text: 'Verified within 24 hours', color: '#C0F0AA' },
                  { icon: Banknote,      text: 'You keep 100% of what you charge', color: '#E0E446' },
                ] as { icon: React.ElementType; text: string; color: string }[]).map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} strokeWidth={1.8} color="#111110" />
                      </div>
                      <span style={{ fontSize: 14, color: 'rgba(17,17,16,.7)', fontWeight: 500 }}>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Right: Form card ── */}
            <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 'clamp(28px, 4vw, 40px)', boxShadow: '0 8px 48px rgba(0,0,0,.10)', border: '1px solid rgba(0,0,0,.06)' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px, 3vw, 30px)', color: '#111110', marginBottom: 6, lineHeight: .95, letterSpacing: .5 }}>
                Secure your spot
              </div>
              <p style={{ fontSize: 13, color: 'rgba(17,17,16,.5)', marginBottom: 24, lineHeight: 1.6 }}>
                Applications are reviewed weekly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <FormField label="Full Name *">
                  <input type="text" placeholder="e.g. Sipho Dlamini" autoComplete="name" value={form.name} onChange={set('name')} />
                </FormField>
                <FormField label="University Email *">
                  <input type="email" placeholder="yourname@students.uct.ac.za" autoComplete="email" inputMode="email" value={form.email} onChange={set('email')} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <FormField label="University *">
                    <select value={form.university} onChange={set('university')}>
                      <option value="">Select...</option>
                      {UNIVERSITIES.map(u => <option key={u}>{u}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Year">
                    <select value={form.year} onChange={set('year')}>
                      <option value="">Select...</option>
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </FormField>
                </div>
                <FormField label="Primary Skill *">
                  <select value={form.skill} onChange={set('skill')}>
                    <option value="">What do you offer?</option>
                    {SKILLS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </FormField>

                {error && (
                  <p style={{ fontSize: 13, color: '#E05A2E', background: 'rgba(255,113,68,.08)', border: '1px solid rgba(255,113,68,.25)', borderRadius: 10, padding: '10px 14px', lineHeight: 1.5 }}>{error}</p>
                )}

                <button onClick={handleSubmit} disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#111110', color: '#E0E446', border: 'none', borderRadius: 100, padding: '16px 28px', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, transition: 'transform .15s, box-shadow .15s', letterSpacing: .3, marginTop: 4 }}>
                  {loading ? 'Securing your spot...' : <>Secure My Spot <ArrowRight size={16} strokeWidth={2.5} /></>}
                </button>
                <p style={{ fontSize: 12, color: 'rgba(17,17,16,.4)', textAlign: 'center', lineHeight: 1.6 }}>
                  Free to list forever. Skillza verification required before your profile goes live.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <style>{`
        .join-page-layout { grid-template-columns: 1fr; }
        @media (min-width: 760px) {
          .join-page-layout { grid-template-columns: 1fr 1fr; }
        }
        input, select, textarea {
          width: 100%;
          background: #F2F0EA;
          border: 1px solid rgba(0,0,0,.12);
          border-radius: 10px;
          padding: 13px 16px;
          color: #111110;
          font-size: 14px;
          font-family: 'Instrument Sans', sans-serif;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          -webkit-appearance: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #334ED8;
          box-shadow: 0 0 0 3px rgba(51,78,216,.1);
        }
        select option { background: #FFFFFF; }
        ${bloblStyles}
      `}</style>
    </>
  )
}

const bloblStyles = `
  @keyframes jblob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,-16px); } }
  @keyframes jblob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-6px,-12px); } }
  @keyframes jblob3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-10px); } }
  @keyframes jblob4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,-13px); } }
  @keyframes jblob5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-8px); } }
  @media (prefers-reduced-motion: reduce) {
    [data-jblob] { animation: none !important; }
  }
`

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(17,17,16,.55)', marginBottom: 7, letterSpacing: .5, textTransform: 'uppercase' }}>{label}</label>
      {children}
    </div>
  )
}
