'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { SKILLS } from '@/lib/skills'

const UNIVERSITIES = ['UCT', 'Wits', 'AFDA', 'Red & Yellow', 'ICA', 'Stellenbosch', 'UJ', 'CPUT', 'Other']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year+', 'Postgrad']

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
      <main style={{ paddingTop: 'calc(60px + env(safe-area-inset-top, 0px))', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 40px' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: 1, marginBottom: 12 }}>
            You're on the list, {form.name.split(' ')[0]}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 28 }}>
            We'll review your application and reach out within 48 hours with next steps on setting up your profile.
          </p>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>What happens next</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { n: '01', t: 'We review your application' },
                { n: '02', t: 'You get an email with your profile link' },
                { n: '03', t: 'Complete your profile and submit for Skillza verification' },
                { n: '04', t: 'We verify you and your profile goes live' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: 'var(--orange)', letterSpacing: 1, flexShrink: 0, marginTop: 1 }}>{step.n}</span>
                  <span style={{ fontSize: 14, color: 'var(--cream-dim)', lineHeight: 1.5 }}>{step.t}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>Back to Skillza</Link>
        </div>
      </main>
    </>
  )
}

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'calc(60px + env(safe-area-inset-top, 0px))', padding: '100px 20px 80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="eyebrow">For Students</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 8vw, 64px)', lineHeight: .9, letterSpacing: 1, marginBottom: 16 }}>
            Join the<br /><span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>Waitlist.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 40 }}>
            Free to list forever. Launching campus by campus. Get early access when yours goes live.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
              <p style={{ fontSize: 13, color: '#ff6b6b', background: 'rgba(255,107,107,.1)', border: '1px solid rgba(255,107,107,.2)', borderRadius: 8, padding: '10px 14px' }}>{error}</p>
            )}

            <button onClick={handleSubmit} disabled={loading} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '16px 28px', opacity: loading ? .7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Securing your spot...' : 'Secure My Spot →'}
            </button>
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
              Free to list forever. Skillza verification required before your profile goes live.
            </p>
          </div>
        </div>
      </main>

      <style>{`
        input, select, textarea {
          width: 100%;
          background: var(--black-2);
          border: 1px solid var(--border-2);
          border-radius: 10px;
          padding: 13px 16px;
          color: var(--cream);
          font-size: 14px;
          font-family: 'Instrument Sans', sans-serif;
          outline: none;
          transition: border-color .2s;
          -webkit-appearance: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: var(--orange);
        }
        select option { background: var(--black-2); }
      `}</style>
    </>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 8, letterSpacing: .3 }}>{label}</label>
      {children}
    </div>
  )
}
