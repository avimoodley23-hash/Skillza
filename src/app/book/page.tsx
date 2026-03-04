'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Link from 'next/link'

export default function BookPage() {
  const params = useParams()
  const studentId = params.id as string

  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.whatsapp || !form.email) {
      setError('Please fill in your name, email and WhatsApp number.')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        clientName: form.name,
        clientEmail: form.email,
        clientWhatsapp: form.whatsapp,
        description: form.description,
      }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setReference(data.reference)
    setLoading(false)
  }

  if (reference) {
    return (
      <>
        <Nav />
        <main style={{ paddingTop: 'calc(60px + env(safe-area-inset-top, 0px))', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 40px' }}>
          <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, marginBottom: 12 }}>Request Sent</h1>
            <p style={{ fontSize: 15, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 28 }}>
              The student will reach out on WhatsApp within 24 hours to confirm scope and availability.
            </p>
            <div style={{ background: 'var(--black-2)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Your Reference</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 4, color: 'var(--orange)' }}>{reference}</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>Keep this safe. Quote it in all communications.</p>
            </div>
            <div style={{ background: 'rgba(255,74,28,.06)', border: '1px solid rgba(255,74,28,.15)', borderRadius: 12, padding: '14px 18px', marginBottom: 28, textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)', marginBottom: 6 }}>Safety reminder</div>
              <p style={{ fontSize: 13, color: 'rgba(245,239,227,.7)', lineHeight: 1.6 }}>
                Only pay the 30% deposit once scope is agreed on WhatsApp. Never pay the full amount upfront.
              </p>
            </div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid rgba(245,239,227,.2)', color: 'var(--cream)', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Back to Skillza</Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'calc(60px + env(safe-area-inset-top, 0px))', minHeight: '100svh', padding: '100px 20px 60px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <Link href={`/students/${studentId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', marginBottom: 32, transition: 'color .2s', textDecoration: 'none' }}>
            ← Back to profile
          </Link>

          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, marginBottom: 8 }}>Book this student</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32, lineHeight: 1.6 }}>
            No account required. We'll connect you directly on WhatsApp within 24 hours.
          </p>

          <div style={{ background: 'rgba(52,213,142,.06)', border: '1px solid rgba(52,213,142,.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Before you book</div>
            <p style={{ fontSize: 13, color: 'rgba(245,239,227,.7)', lineHeight: 1.6 }}>
              Skillza connects you with verified students. Only pay the 30% deposit once you've agreed on scope via WhatsApp.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { id: 'name', label: 'Your Name', placeholder: 'e.g. Keanu Reeves', type: 'text', key: 'name' as const, autoComplete: 'name' },
              { id: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email', key: 'email' as const, autoComplete: 'email' },
              { id: 'whatsapp', label: 'WhatsApp Number', placeholder: '071 234 5678', type: 'tel', key: 'whatsapp' as const, autoComplete: 'tel' },
            ].map(field => (
              <div key={field.id}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 8, letterSpacing: .3 }}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={form[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{ width: '100%', background: 'var(--black-2)', border: '1px solid var(--border-2)', borderRadius: 10, padding: '13px 16px', color: 'var(--cream)', fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', outline: 'none', transition: 'border-color .2s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
                />
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 8, letterSpacing: .3 }}>
                What do you need? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional but helps)</span>
              </label>
              <textarea
                placeholder="e.g. I need a photographer for my 21st birthday party on 15 April in Claremont..."
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                style={{ width: '100%', background: 'var(--black-2)', border: '1px solid var(--border-2)', borderRadius: 10, padding: '13px 16px', color: 'var(--cream)', fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', outline: 'none', resize: 'vertical', transition: 'border-color .2s' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#ff6b6b', background: 'rgba(255,107,107,.1)', border: '1px solid rgba(255,107,107,.2)', borderRadius: 8, padding: '10px 14px' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: '100%', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 28px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1 }}
            >
              {loading ? 'Sending...' : 'Send Booking Request →'}
            </button>
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
              The student has 24 hours to respond. You'll hear from them on WhatsApp to confirm.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
