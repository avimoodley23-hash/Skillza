'use client'
import { useState, useEffect } from 'react'
import { User, MessageCircle, CheckCircle } from 'lucide-react'
import type { AccentColors } from '@/components/ProfilePanel'

interface Student {
  id: number
  name: string
  skill: string
  university: string
  emoji: string
  photo_url?: string | null
  student_pricing: { name: string; price: string; unit: string; featured: boolean }[]
}

const DEFAULT_COLORS: AccentColors = {
  bg: '#334ED8', imgGrad: '#1E3AC0', text: '#FFFFFF',
  bookBg: '#334ED8', bookText: '#FFFFFF',
  verBg: '#E0E446', verText: '#1A1A1A',
  ratingCol: '#E0E446', hoverShadow: 'rgba(51,78,216,0.35)',
}

interface Props {
  student: Student | null
  onClose: () => void
  colors?: AccentColors
}

export function BookingModal({ student, onClose, colors = DEFAULT_COLORS }: Props) {
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
          background: 'rgba(0,0,0,.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
        className="bm-ov"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="bm"
          style={{
            background: '#FAFAF6',
            borderRadius: '20px 20px 0 0',
            width: '100%', position: 'relative',
            animation: 'bmUp .3s cubic-bezier(.16,1,.3,1)',
            maxHeight: '92svh', overflowY: 'auto',
          }}
        >
          {/* Coloured top accent strip */}
          <div style={{
            height: 5,
            borderRadius: '20px 20px 0 0',
            background: `linear-gradient(90deg, ${colors.bg}, ${colors.imgGrad})`,
          }} />

          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
            <div style={{ width: 36, height: 4, background: 'rgba(17,17,16,.14)', borderRadius: 2 }} />
          </div>

          <button onClick={handleClose} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(17,17,16,.06)', border: '1px solid rgba(17,17,16,.1)',
            color: '#111110', borderRadius: 8, width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, cursor: 'pointer',
          }}>×</button>

          <div style={{ padding: '16px 22px calc(22px + var(--safe-b))' }} className="bm-inner">
            {/* Who */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(17,17,16,.09)' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 10,
                background: `linear-gradient(135deg, ${colors.bg}, ${colors.imgGrad})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, overflow: 'hidden',
              }}>
                {student.photo_url
                  ? <img src={student.photo_url} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  : <User size={22} strokeWidth={2} color={colors.text} />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111110' }}>{student.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{student.skill} · {student.university}</div>
              </div>
            </div>

            {!confirmed ? (
              <>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, marginBottom: 3, color: '#111110' }}>Book {student.name.split(' ')[0]}</div>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 20, lineHeight: 1.65 }}>Fill in your details and we'll connect you on WhatsApp within 24 hours.</p>

                <div style={{ background: `${colors.bg}0f`, border: `1px solid ${colors.bg}28`, borderRadius: 10, padding: '13px 15px', marginBottom: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: colors.bookBg, marginBottom: 5 }}>30% Deposit Required</div>
                  <p style={{ fontSize: 13, color: 'rgba(17,17,16,.65)', lineHeight: 1.65 }}>A <strong style={{ color: '#111110' }}>30% deposit</strong> is required before work begins. The remaining 70% is paid directly to the student on completion.</p>
                </div>

                {/* Form */}
                {[
                  { label: 'Your Name', value: name, set: setName, placeholder: 'Full name', type: 'text' },
                  { label: 'WhatsApp Number', value: whatsapp, set: setWhatsapp, placeholder: '+27 ...', type: 'tel' },
                  { label: 'Email Address', value: email, set: setEmail, placeholder: 'you@example.com', type: 'email' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 13 }}>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={e => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: '100%', padding: '13px 14px', background: 'rgba(17,17,16,.03)', border: '1px solid rgba(17,17,16,.11)', borderRadius: 8, fontSize: 16, color: '#111110', outline: 'none', boxSizing: 'border-box', transition: 'border-color .18s' }}
                      onFocus={e => (e.currentTarget.style.borderColor = `${colors.bookBg}66`)}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(17,17,16,.11)')}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 13 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>What do you need? (optional)</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Brief description of your project..."
                    rows={3}
                    style={{ width: '100%', padding: '13px 14px', background: 'rgba(17,17,16,.03)', border: '1px solid rgba(17,17,16,.11)', borderRadius: 8, fontSize: 14, color: '#111110', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color .18s' }}
                    onFocus={e => (e.currentTarget.style.borderColor = `${colors.bookBg}66`)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(17,17,16,.11)')}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: 'rgba(37,167,90,.07)', border: '1px solid rgba(37,167,90,.2)', borderRadius: 10, padding: 13, marginBottom: 18 }}>
                  <MessageCircle size={18} strokeWidth={2} color="#1A7A44" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: 'rgba(17,17,16,.65)', lineHeight: 1.65 }}>After submitting, <strong style={{ color: '#1A7A44' }}>you'll be contacted on WhatsApp</strong> within 24 hours to confirm scope and arrange the deposit.</p>
                </div>

                <button
                  onClick={submit}
                  disabled={loading}
                  style={{
                    width: '100%', background: colors.bookBg, color: colors.bookText,
                    border: 'none', borderRadius: 10, padding: 16,
                    fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1, minHeight: 52,
                    boxShadow: `0 4px 18px ${colors.hoverShadow}`,
                    transition: 'opacity .18s',
                  }}
                >
                  {loading ? 'Sending...' : `Request Booking →`}
                </button>
                <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(17,17,16,.35)', marginTop: 11, lineHeight: 1.6 }}>No payment now. You'll confirm everything on WhatsApp first.</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', paddingBottom: 'calc(28px + var(--safe-b))' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><CheckCircle size={52} strokeWidth={1.5} color={colors.bookBg} /></div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>Your Reference</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 3, color: colors.bookBg, marginBottom: 10 }}>{ref}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: .5, marginBottom: 8, color: '#111110' }}>Request Sent!</div>
                <p style={{ fontSize: 14, color: 'rgba(17,17,16,.6)', lineHeight: 1.75, marginBottom: 24, textAlign: 'left' }}>
                  {student.name.split(' ')[0]} will reach out on WhatsApp within 24 hours to confirm scope and arrange the 30% deposit. Save your reference number above.
                </p>
                <button onClick={handleClose} style={{
                  width: '100%', background: colors.bookBg, color: colors.bookText,
                  border: 'none', borderRadius: 10, padding: 16, fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  boxShadow: `0 4px 18px ${colors.hoverShadow}`,
                }}>
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
          background: '#111110', color: '#FAFAF6',
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
