'use client'
import { useState, useEffect } from 'react'

interface Student {
  id: number
  name: string
  skill: string
  university: string
  emoji: string
  student_pricing: { name: string; price: string; unit: string; featured: boolean }[]
}

interface Props {
  student: Student | null
  onClose: () => void
}

export function BookingModal({ student, onClose }: Props) {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [ref, setRef] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (student) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [student])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setConfirmed(false)
      setName(''); setWhatsapp(''); setEmail(''); setDescription('')
    }, 400)
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  // ✅ FIX: Now calls /api/book instead of Formspree
  const submit = async () => {
    if (!name || !whatsapp || !email) {
      showToast('Please fill in your name, WhatsApp number and email.')
      return
    }
    setLoading(true)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student!.id,
          clientName: name,
          clientEmail: email,
          clientWhatsapp: whatsapp,
          description,
        }),
      })

      const data = await res.json()

      if (!res.ok || data?.error) {
        showToast(data?.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setRef(data.reference)
      setConfirmed(true)
    } catch (err) {
      console.error('Booking error:', err)
      showToast('Network error. Please try again.')
    }

    setLoading(false)
  }

  if (!student) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 700,
          background: 'rgba(0,0,0,.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
        className="bm-ov"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="bm"
          style={{
            background: 'var(--black-2)',
            border: '1px solid var(--border)',
            borderRadius: '20px 20px 0 0',
            width: '100%', position: 'relative',
            animation: 'bmUp .3s cubic-bezier(.16,1,.3,1)',
            maxHeight: '92svh', overflowY: 'auto',
          }}
        >
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
            <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,.14)', borderRadius: 2 }} />
          </div>

          <button onClick={handleClose} style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,255,255,.07)', border: '1px solid var(--border)',
            color: 'var(--cream)', borderRadius: 8, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, cursor: 'pointer',
          }}>×</button>

          <div style={{ padding: '20px 22px calc(22px + var(--safe-b))' }} className="bm-inner">
            {/* Who */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: '1px solid var(--border)' }}>{student.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{student.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{student.skill} · {student.university}</div>
              </div>
            </div>

            {!confirmed ? (
              <>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, letterSpacing: 1, marginBottom: 4 }}>Book {student.name.split(' ')[0]}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>Fill in your details and we'll connect you on WhatsApp within 24 hours.</p>

                <div style={{ background: 'var(--o-dim)', border: '1px solid rgba(255,74,28,.22)', borderRadius: 10, padding: '13px 15px', marginBottom: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 5 }}>30% Deposit Required</div>
                  <p style={{ fontSize: 13, color: 'rgba(245,239,227,.7)', lineHeight: 1.6 }}>A <strong style={{ color: 'var(--cream)' }}>30% deposit</strong> is required before work begins. The remaining 70% is paid directly to the student on completion.</p>
                </div>

                {/* Form */}
                {[
                  { label: 'Your Name', value: name, set: setName, placeholder: 'Full name', type: 'text' },
                  { label: 'WhatsApp Number', value: whatsapp, set: setWhatsapp, placeholder: '+27 ...', type: 'tel' },
                  { label: 'Email Address', value: email, set: setEmail, placeholder: 'you@example.com', type: 'email' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 13 }}>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,239,227,.38)', marginBottom: 7 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={e => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: '100%', padding: '13px 14px', background: 'rgba(245,239,227,.05)', border: '1px solid rgba(245,239,227,.09)', borderRadius: 8, fontSize: 16, color: 'var(--cream)', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 13 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,239,227,.38)', marginBottom: 7 }}>What do you need? (optional)</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Brief description of your project..."
                    rows={3}
                    style={{ width: '100%', padding: '13px 14px', background: 'rgba(245,239,227,.05)', border: '1px solid rgba(245,239,227,.09)', borderRadius: 8, fontSize: 14, color: 'var(--cream)', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: 'rgba(37,211,102,.07)', border: '1px solid rgba(37,211,102,.18)', borderRadius: 10, padding: 13, marginBottom: 18 }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💬</span>
                  <p style={{ fontSize: 12, color: 'rgba(245,239,227,.65)', lineHeight: 1.6 }}>After submitting, <strong style={{ color: 'var(--green)' }}>you'll be contacted on WhatsApp</strong> within 24 hours to confirm scope and arrange the deposit.</p>
                </div>

                <button
                  onClick={submit}
                  disabled={loading}
                  style={{
                    width: '100%', background: 'var(--orange)', color: '#fff',
                    border: 'none', borderRadius: 10, padding: 16,
                    fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1, minHeight: 52,
                  }}
                >
                  {loading ? 'Sending...' : `Request Booking →`}
                </button>
                <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(245,239,227,.3)', marginTop: 11, lineHeight: 1.6 }}>No payment now. You'll confirm everything on WhatsApp first.</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', paddingBottom: 'calc(28px + var(--safe-b))' }}>
                <span style={{ fontSize: 48, marginBottom: 12, display: 'block' }}>🎉</span>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Your Reference</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 3, color: 'var(--orange)', marginBottom: 10 }}>{ref}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: .5, marginBottom: 8 }}>Request Sent!</div>
                <p style={{ fontSize: 14, color: 'rgba(245,239,227,.6)', lineHeight: 1.7, marginBottom: 24, textAlign: 'left' }}>
                  {student.name.split(' ')[0]} will reach out on WhatsApp within 24 hours to confirm scope and arrange the 30% deposit. Save your reference number above.
                </p>
                <button onClick={handleClose} style={{ width: '100%', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: 16, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 'calc(24px + var(--safe-b))', left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--cream)', color: 'var(--black)',
          padding: '12px 22px', borderRadius: 100,
          fontSize: 14, fontWeight: 600, zIndex: 9990,
          whiteSpace: 'nowrap', maxWidth: '88vw',
        }}>{toast}</div>
      )}

      <style>{`
        @keyframes bmUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @media(min-width:600px){
          .bm-ov { align-items: center !important; padding: 24px; }
          .bm { border-radius: 20px !important; max-width: 460px !important; animation: bmIn .3s cubic-bezier(.16,1,.3,1) !important; }
          .bm-inner { padding: 28px !important; }
          @keyframes bmIn { from{opacity:0;transform:scale(.96) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        }
      `}</style>
    </>
  )
}

export default BookingModal
