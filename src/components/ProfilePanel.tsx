'use client'
import { useEffect } from 'react'

interface Student {
  id: number
  name: string
  short_name: string
  university: string
  degree: string
  year: string
  skill: string
  category: string
  bio: string
  emoji: string
  verified: boolean
  student_pricing: { name: string; description: string; price: string; unit: string; featured: boolean }[]
  student_portfolio: { emoji: string; label: string }[]
  student_reviews: { reviewer_name: string; stars: number; text: string; date: string }[]
}

interface Props {
  student: Student | null
  onClose: () => void
  onBook: (student: Student) => void
}

export function ProfilePanel({ student, onClose, onBook }: Props) {
  useEffect(() => {
    if (student) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [student])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!student) return null

  const minPrice = student.student_pricing?.[0]?.price ?? ''

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 600,
          background: 'rgba(0,0,0,.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        }}
        className="panel-ov"
      >
        {/* Panel */}
        <div
          onClick={e => e.stopPropagation()}
          className="panel"
          style={{
            width: '100%', maxHeight: '92svh',
            background: 'var(--black-2)',
            borderRadius: '20px 20px 0 0',
            borderTop: '1px solid var(--border)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch' as any,
            animation: 'shUp .35s cubic-bezier(.16,1,.3,1)',
          }}
        >
          {/* Handle (mobile) */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 2px' }}>
            <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,.14)', borderRadius: 2 }} />
          </div>

          {/* Header */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 22px',
            background: 'rgba(22,20,16,.97)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
          }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Student Profile</span>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,.07)', border: '1px solid var(--border)',
              color: 'var(--cream)', borderRadius: 8, width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
              cursor: 'pointer',
            }}>×</button>
          </div>

          {/* Hero */}
          <div style={{ padding: '22px 22px 0', display: 'flex', gap: 15, alignItems: 'center', marginBottom: 20 }}>
            <div style={{
              width: 68, height: 68, borderRadius: 14,
              background: '#1a1a1a', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 34, flexShrink: 0,
              border: '1px solid var(--border)',
            }}>{student.emoji}</div>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, lineHeight: 1 }}>{student.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{student.skill} · {student.degree}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'var(--g-dim)', color: 'var(--green)', border: '1px solid rgba(46,204,113,.3)' }}>✓ Student Card Verified</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(255,255,255,.05)', color: 'var(--cream)', border: '1px solid var(--border)' }}>{student.university}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'var(--o-dim)', color: 'var(--orange)', border: '1px solid rgba(255,74,28,.2)' }}>{student.year}</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div style={{ padding: '0 22px 22px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 13 }}>About</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(245,239,227,.65)' }}>{student.bio}</p>
          </div>

          {/* Portfolio */}
          {student.student_portfolio?.length > 0 && (
            <div style={{ padding: '22px 22px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 13 }}>Portfolio Work</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
                {student.student_portfolio.map((p, i) => (
                  <div key={i} style={{
                    aspectRatio: '1', borderRadius: 8,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, border: '1px solid var(--border)',
                    background: 'var(--card)', gap: 6,
                  }}>
                    {p.emoji}
                    <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--muted)', letterSpacing: .3, textTransform: 'uppercase' }}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          {student.student_pricing?.length > 0 && (
            <div style={{ padding: '22px 22px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 13 }}>Pricing</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {student.student_pricing.map((p, i) => (
                  <div key={i} style={{
                    background: p.featured ? 'var(--o-dim)' : 'var(--card)',
                    border: `1px solid ${p.featured ? 'var(--orange)' : 'var(--border)'}`,
                    borderRadius: 11, padding: '15px 17px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.description}</div>
                      {p.featured && <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--orange)', color: '#fff', padding: '2px 7px', borderRadius: 100, marginTop: 3, display: 'inline-block' }}>Most Popular</span>}
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: 'var(--cream)', textAlign: 'right', flexShrink: 0 }}>
                      {p.price}<small style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 10, fontWeight: 400, color: 'var(--muted)', display: 'block' }}>/ {p.unit}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {student.student_reviews?.length > 0 && (
            <div style={{ padding: '22px 22px', paddingBottom: 120 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 13 }}>Reviews</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {student.student_reviews.map((r, i) => (
                  <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{r.reviewer_name}</span>
                      <span style={{ color: 'var(--gold)', fontSize: 12 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(245,239,227,.6)', lineHeight: 1.65 }}>{r.text}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 5 }}>{r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky CTA */}
          <div style={{
            position: 'sticky', bottom: 0,
            padding: '14px 22px', paddingBottom: 'calc(14px + var(--safe-b))',
            background: 'rgba(17,17,17,.97)',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 11, alignItems: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>Starting from</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: 'var(--cream)', lineHeight: 1 }}>{minPrice}</div>
            </div>
            <button
              onClick={() => onBook(student)}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Book {student.name.split(' ')[0]} →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @media(min-width:700px){
          .panel-ov { align-items: stretch !important; }
          .panel {
            width: 100% !important;
            max-width: 560px !important;
            max-height: 100% !important;
            border-radius: 0 !important;
            border-top: none !important;
            border-left: 1px solid var(--border) !important;
            animation: drIn .35s cubic-bezier(.16,1,.3,1) !important;
          }
          @keyframes drIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        }
      `}</style>
    </>
  )
}

export default ProfilePanel
