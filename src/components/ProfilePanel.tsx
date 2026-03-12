'use client'
import { useEffect, useState } from 'react'
import {
  User, Instagram, Music2, Linkedin, Palette, Dribbble,
  Youtube, Github, HardDrive, Pin, Twitter, Link2, Image as ImageIcon,
} from 'lucide-react'

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
  photo_url?: string | null
  verified: boolean
  availability?: string[] | null
  portfolio_links?: string | null
  student_pricing: { name: string; description: string; price: string; unit: string; featured: boolean }[]
  student_portfolio: { emoji: string | null; label: string | null; image_url?: string | null }[]
  student_reviews: { reviewer_name: string; stars: number; text: string; date: string }[]
}

export interface AccentColors {
  bg: string
  imgGrad: string
  text: string
  bookBg: string
  bookText: string
  verBg: string
  verText: string
  ratingCol: string
  hoverShadow: string
}

const DEFAULT_COLORS: AccentColors = {
  bg: '#334ED8', imgGrad: '#1E3AC0', text: '#FFFFFF',
  bookBg: '#FFFFFF', bookText: '#334ED8',
  verBg: '#E0E446', verText: '#1A1A1A',
  ratingCol: '#E0E446', hoverShadow: 'rgba(51,78,216,0.35)',
}

function formatPrice(price: string): string {
  const p = (price ?? '').trim()
  if (!p || p.toLowerCase() === 'n/a') return p
  return /^R/i.test(p) ? p : `R${p}`
}

function detectPlatform(url: string): { label: string; icon: React.ReactNode } {
  const u = url.toLowerCase()
  if (u.includes('instagram.com')) return { label: 'Instagram', icon: <Instagram size={18} strokeWidth={1.5} /> }
  if (u.includes('tiktok.com')) return { label: 'TikTok', icon: <Music2 size={18} strokeWidth={1.5} /> }
  if (u.includes('linkedin.com')) return { label: 'LinkedIn', icon: <Linkedin size={18} strokeWidth={1.5} /> }
  if (u.includes('behance.net')) return { label: 'Behance', icon: <Palette size={18} strokeWidth={1.5} /> }
  if (u.includes('dribbble.com')) return { label: 'Dribbble', icon: <Dribbble size={18} strokeWidth={1.5} /> }
  if (u.includes('youtube.com') || u.includes('youtu.be')) return { label: 'YouTube', icon: <Youtube size={18} strokeWidth={1.5} /> }
  if (u.includes('github.com')) return { label: 'GitHub', icon: <Github size={18} strokeWidth={1.5} /> }
  if (u.includes('drive.google.com')) return { label: 'Google Drive', icon: <HardDrive size={18} strokeWidth={1.5} /> }
  if (u.includes('pinterest.com')) return { label: 'Pinterest', icon: <Pin size={18} strokeWidth={1.5} /> }
  if (u.includes('twitter.com') || u.includes('x.com')) return { label: 'X / Twitter', icon: <Twitter size={18} strokeWidth={1.5} /> }
  return { label: 'Portfolio', icon: <Link2 size={18} strokeWidth={1.5} /> }
}

interface Props {
  student: Student | null
  onClose: () => void
  onBook: (student: Student) => void
  colors?: AccentColors
}

export function ProfilePanel({ student, onClose, onBook, colors = DEFAULT_COLORS }: Props) {
  const [reviewSummary, setReviewSummary] = useState('')
  const [reviewSummaryLoading, setReviewSummaryLoading] = useState(false)

  // Auto-fetch review summary whenever a student with 2+ reviews is opened
  useEffect(() => {
    setReviewSummary('')
    if (!student || !student.student_reviews || student.student_reviews.length < 2) return
    const reviews = student.student_reviews.filter(r => r.text?.trim())
    if (reviews.length < 2) return

    setReviewSummaryLoading(true)
    fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'summarize_reviews', reviews }),
    })
      .then(r => r.json())
      .then(data => { if (data.text) setReviewSummary(data.text) })
      .catch(() => {/* silently ignore */})
      .finally(() => setReviewSummaryLoading(false))
  }, [student?.id])

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

  const minPrice = formatPrice(student.student_pricing?.[0]?.price ?? '')
  // Derive a readable accent for text overlaid on the card bg
  const accentOnLight = colors.bookBg  // e.g. #334ED8

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 600,
          background: 'rgba(0,0,0,.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
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
            background: '#FAFAF6',
            borderRadius: '20px 20px 0 0',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch' as any,
            animation: 'shUp .35s cubic-bezier(.16,1,.3,1)',
          }}
        >
          {/* Sticky header bar */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 20px',
            background: 'rgba(250,250,246,.96)',
            borderBottom: '1px solid rgba(17,17,16,.08)',
            backdropFilter: 'blur(14px)',
          }}>
            {/* Handle centered above header */}
            <div style={{ width: 36, height: 4, background: 'rgba(17,17,16,.14)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: '#888', fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' }}>Profile</span>
            <button onClick={onClose} style={{
              background: 'rgba(17,17,16,.06)', border: '1px solid rgba(17,17,16,.1)',
              color: '#111110', borderRadius: 8, width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              cursor: 'pointer',
            }}>×</button>
          </div>

          {/* Coloured hero strip with blobs */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.imgGrad})`,
            height: 120, flexShrink: 0,
          }}>
            {/* Decorative blobs */}
            <div style={{ position: 'absolute', width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,.1)', top: -40, right: -20, animation: 'ppBlob1 5s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,.08)', bottom: -30, left: '30%', animation: 'ppBlob2 6.5s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,.12)', top: 10, left: 20, animation: 'ppBlob3 4.2s ease-in-out infinite' }} />
          </div>

          {/* Avatar overlapping the strip */}
          <div style={{ padding: '0 22px', marginTop: -46, marginBottom: 16, position: 'relative', zIndex: 2 }}>
            <div style={{
              width: 82, height: 82, borderRadius: 18,
              background: colors.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 40, flexShrink: 0,
              border: '3px solid #FAFAF6', overflow: 'hidden',
              boxShadow: `0 4px 20px ${colors.hoverShadow}`,
            }}>
              {student.photo_url
                ? <img src={student.photo_url} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                : <User size={38} strokeWidth={1.5} color={colors.text} />
              }
            </div>
          </div>

          {/* Name + badges */}
          <div style={{ padding: '0 22px 20px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, lineHeight: 1, color: '#111110', marginBottom: 3 }}>{student.name}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>{student.skill} · {student.degree}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100,
                background: colors.verBg, color: colors.verText,
                letterSpacing: .3,
              }}>✓ Skillza Verified</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(17,17,16,.07)', color: '#333', border: '1px solid rgba(17,17,16,.1)' }}>{student.university}</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: `${colors.bg}18`, color: accentOnLight, border: `1px solid ${colors.bg}30` }}>{student.year}</span>
            </div>
          </div>

          {/* About */}
          <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>About</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(17,17,16,.72)' }}>{student.bio}</p>
            {student.availability && student.availability.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>Availability</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {student.availability.map(a => (
                    <span key={a} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: 'rgba(51,139,78,.1)', color: '#246B34', border: '1px solid rgba(51,139,78,.22)' }}>{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Portfolio */}
          {student.student_portfolio?.length > 0 && (
            <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Portfolio Work</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
                {student.student_portfolio.map((p, i) => (
                  p.image_url ? (
                    <a
                      key={i}
                      href={p.image_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        aspectRatio: '1', borderRadius: 9, display: 'block',
                        overflow: 'hidden', border: '1px solid rgba(17,17,16,.1)',
                        background: '#EEE', position: 'relative', cursor: 'pointer',
                      }}
                    >
                      <img
                        src={p.image_url}
                        alt={p.label || 'Portfolio image'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {p.label && (
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          padding: '22px 6px 5px',
                          background: 'linear-gradient(to top, rgba(0,0,0,.65) 0, transparent 100%)',
                          fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.9)',
                          letterSpacing: .3, textTransform: 'uppercase',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {p.label}
                        </div>
                      )}
                    </a>
                  ) : (
                    <div key={i} style={{
                      aspectRatio: '1', borderRadius: 9,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(17,17,16,.09)',
                      background: '#F0EDE4', gap: 5,
                    }}>
                      <ImageIcon size={28} strokeWidth={1.5} color="#AAA" />
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#888', letterSpacing: .3, textTransform: 'uppercase', textAlign: 'center', padding: '0 4px' }}>{p.label}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Links / Socials */}
          {student.portfolio_links && student.portfolio_links.trim() && (() => {
            const links = student.portfolio_links!.split('\n').map(l => l.trim()).filter(l =>
              Boolean(l) && l.toLowerCase() !== 'n/a' && (l.startsWith('http://') || l.startsWith('https://'))
            )
            if (!links.length) return null
            return (
              <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Portfolio & Socials</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {links.map((url, i) => {
                    const { label, icon } = detectPlatform(url)
                    const display = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
                    return (
                      <a key={i} href={url} target="_blank" rel="noreferrer noopener"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          background: '#F5F3EE', border: '1px solid rgba(17,17,16,.09)',
                          borderRadius: 10, padding: '12px 14px', textDecoration: 'none',
                          transition: 'border-color .15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${colors.bg}55`)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(17,17,16,.09)')}
                      >
                        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#111110' }}>{label}</div>
                          <div style={{ fontSize: 11, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display}</div>
                        </div>
                        <span style={{ marginLeft: 'auto', color: '#888', fontSize: 13, flexShrink: 0 }}>↗</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {/* Pricing */}
          {student.student_pricing?.length > 0 && (
            <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Pricing</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {student.student_pricing.map((p, i) => (
                  <div key={i} style={{
                    background: p.featured ? `${colors.bg}12` : '#F5F3EE',
                    border: `1px solid ${p.featured ? `${colors.bg}40` : 'rgba(17,17,16,.09)'}`,
                    borderRadius: 11, padding: '15px 17px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, color: '#111110' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{p.description}</div>
                      {p.featured && <span style={{ fontSize: 9, fontWeight: 700, background: colors.bookBg, color: colors.bookText, padding: '2px 8px', borderRadius: 100, marginTop: 5, display: 'inline-block', letterSpacing: .4 }}>Most Popular</span>}
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: '#111110', textAlign: 'right', flexShrink: 0 }}>
                      {p.price}<small style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 10, fontWeight: 400, color: '#888', display: 'block' }}>/ {p.unit}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {student.student_reviews?.length > 0 && (
            <div style={{ padding: '20px 22px', paddingBottom: 120 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Reviews</div>
              {(reviewSummaryLoading || reviewSummary) && (
                <div style={{ background: `${colors.bg}0d`, border: `1px solid ${colors.bg}25`, borderRadius: 10, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>✨</span>
                  {reviewSummaryLoading
                    ? <span style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>Summarising reviews…</span>
                    : <span style={{ fontSize: 13, color: 'rgba(17,17,16,.72)', lineHeight: 1.55, fontStyle: 'italic' }}>{reviewSummary}</span>
                  }
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {student.student_reviews.map((r, i) => (
                  <div key={i} style={{ background: '#F5F3EE', border: '1px solid rgba(17,17,16,.08)', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: '#111110' }}>{r.reviewer_name}</span>
                      <span style={{ color: '#D4A800', fontSize: 13 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(17,17,16,.65)', lineHeight: 1.72 }}>{r.text}</div>
                    <div style={{ fontSize: 10, color: '#888', marginTop: 5 }}>{r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky CTA */}
          <div style={{
            position: 'sticky', bottom: 0,
            padding: '14px 22px', paddingBottom: 'calc(14px + var(--safe-b))',
            background: 'rgba(250,250,246,.97)',
            borderTop: '1px solid rgba(17,17,16,.1)',
            display: 'flex', gap: 11, alignItems: 'center',
            backdropFilter: 'blur(14px)',
          }}>
            <div>
              <div style={{ fontSize: 10, color: '#888' }}>Starting from</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: '#111110', lineHeight: 1 }}>{minPrice}</div>
            </div>
            <button
              onClick={() => onBook(student)}
              style={{
                flex: 1, background: colors.bookBg, color: colors.bookText,
                border: 'none', borderRadius: 10, padding: '14px 18px',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', minHeight: 48,
                boxShadow: `0 4px 18px ${colors.hoverShadow}`,
                transition: 'opacity .18s',
                justifyContent: 'center', display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Book {student.name.split(' ')[0]} →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes ppBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10px,8px) scale(1.06)} }
        @keyframes ppBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8px,-6px) scale(0.94)} }
        @keyframes ppBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(5px,10px) scale(1.1)} }
        @media (prefers-reduced-motion: reduce) {
          [style*="ppBlob"] { animation: none !important; }
        }
        @media(min-width:700px){
          .panel-ov { align-items: stretch !important; }
          .panel {
            width: 100% !important;
            max-width: 560px !important;
            max-height: 100% !important;
            border-radius: 0 !important;
            border-left: 1px solid rgba(17,17,16,.1) !important;
            animation: drIn .35s cubic-bezier(.16,1,.3,1) !important;
          }
          @keyframes drIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        }
      `}</style>
    </>
  )
}

export default ProfilePanel
