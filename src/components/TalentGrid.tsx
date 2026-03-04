'use client'
import { useState } from 'react'
import type { Student } from '@/types/database'
import { ProfilePanel } from '@/components/ProfilePanel'
import { BookingModal } from '@/components/BookingModal'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'photography', label: '📸 Photography' },
  { id: 'design', label: '🎨 Design' },
  { id: 'video', label: '🎬 Video' },
  { id: 'mua', label: '💄 MUA' },
  { id: 'catering', label: '🍰 Catering' },
  { id: 'tutoring', label: '📚 Tutoring' },
  { id: 'dj', label: '🎵 DJ' },
  { id: 'webdev', label: '💻 Web Dev' },
]

const SORT_OPTIONS = [
  { id: 'default', label: 'Featured' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

function parsePrice(p: string): number {
  return parseInt(p.replace(/[^0-9]/g, '')) || 0
}

export default function TalentGrid({ students }: { students: Student[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [activeStudent, setActiveStudent] = useState<Student | null>(null)
  const [bookingStudent, setBookingStudent] = useState<Student | null>(null)

  const filtered = students
    .filter(s => activeFilter === 'all' || s.category === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return parsePrice(a.starting_price) - parsePrice(b.starting_price)
      if (sortBy === 'price_desc') return parsePrice(b.starting_price) - parsePrice(a.starting_price)
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const openProfile = (student: Student) => {
    setBookingStudent(null)
    setActiveStudent(student)
  }

  const openBooking = (student: Student) => {
    setActiveStudent(null)
    setBookingStudent(student)
  }

  return (
    <>
      <section id="find-talent" style={{ padding: 'clamp(48px, 8vw, 80px) 24px 40px' }}>
        <div style={{ marginBottom: 20 }}>
          <div className="eyebrow">Browse Talent</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
            Trained. Verified.<br />Right in your city.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>Showing {filtered.length} verified student{filtered.length !== 1 ? 's' : ''}</p>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'var(--black-2)', color: 'var(--cream)',
                border: '1px solid var(--border-2)', borderRadius: 8,
                padding: '8px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Instrument Sans, sans-serif',
              }}
            >
              {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{
          position: 'sticky', top: 'calc(60px + env(safe-area-inset-top, 0px))', zIndex: 200,
          background: 'rgba(16,15,13,.95)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          margin: '0 -24px', padding: '10px 24px',
          overflowX: 'auto', display: 'flex', gap: 6,
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              style={{
                padding: '8px 16px', borderRadius: 100,
                fontSize: 12, fontWeight: 600,
                border: '1px solid',
                borderColor: activeFilter === cat.id ? 'var(--orange)' : 'var(--border-2)',
                background: activeFilter === cat.id ? 'var(--orange)' : 'transparent',
                color: activeFilter === cat.id ? '#fff' : 'var(--muted-2)',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all .18s', minHeight: 36, flexShrink: 0,
                boxShadow: activeFilter === cat.id ? '0 2px 12px rgba(255,75,31,.3)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 16 }} className="talent-grid">
          {filtered.map((student, i) => (
            <StudentCard
              key={student.id}
              student={student}
              index={i}
              onOpen={() => openProfile(student)}
              onBook={() => openBooking(student)}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              No students in this category yet.
            </div>
          )}
        </div>

        <style>{`
          @keyframes fup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          @media (min-width: 700px) { .talent-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; gap: 16px !important; } }
          @media (min-width: 900px) { .talent-grid { gap: 20px !important; } }
          @media (max-width: 559px) { .tc-img { display: none !important; } .tc-bio { display: none !important; } .tc-tags { display: none !important; } }
          @media (min-width: 560px) { .tc-mob-bar { display: none !important; } .tc-body { padding: 14px 15px 15px !important; } }
        `}</style>
      </section>

      {/* Profile panel */}
      {activeStudent && (
        <ProfilePanel
          student={activeStudent as any}
          onClose={() => setActiveStudent(null)}
          onBook={(s) => { setActiveStudent(null); setBookingStudent(s as any) }}
        />
      )}

      {/* Booking modal */}
      {bookingStudent && (
        <BookingModal
          student={bookingStudent as any}
          onClose={() => setBookingStudent(null)}
        />
      )}
    </>
  )
}

function StudentCard({ student, index, onOpen, onBook }: {
  student: Student
  index: number
  onOpen: () => void
  onBook: () => void
}) {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onOpen() }}
      aria-label={`View ${student.name}'s profile`}
      style={{
        background: 'var(--black-2)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all .3s',
        cursor: 'pointer',
        animation: `fup .4s ease both`,
        animationDelay: `${index * 0.04}s`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--black-3)'
        el.style.borderColor = 'rgba(255,75,31,.3)'
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(255,75,31,.1)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--black-2)'
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Mobile compact bar */}
      <div className="tc-mob-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 12px 0', gap: 6 }}>
        {student.photo_url
          ? <img src={student.photo_url} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0 }} />
          : <span style={{ fontSize: 22 }}>{student.emoji}</span>
        }
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--muted)', background: 'rgba(245,239,227,.06)', padding: '3px 7px', borderRadius: 100, border: '1px solid var(--border)' }}>{student.university} · {student.year}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--green)', background: 'rgba(52,213,142,.1)', border: '1px solid rgba(52,213,142,.25)', padding: '3px 7px', borderRadius: 100 }}>✓ Verified</span>
      </div>

      {/* Desktop image area */}
      <div className="tc-img" style={{ position: 'relative', aspectRatio: '4/3', background: 'linear-gradient(135deg, #1e1c19, #141210)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, overflow: 'hidden' }}>
        {student.photo_url
          ? <img src={student.photo_url} alt={student.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          : student.emoji
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,15,13,.85) 0, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(16,15,13,.8)', border: '1px solid rgba(245,239,227,.1)', color: 'rgba(245,239,227,.7)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 100 }}>{student.university} · {student.year}</div>
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(52,213,142,.12)', border: '1px solid rgba(52,213,142,.3)', color: 'var(--green)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 100 }}>✓ Verified</div>
      </div>

      {/* Card body */}
      <div style={{ padding: '11px 12px 12px' }} className="tc-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--cream)', lineHeight: 1.2 }}>{student.short_name}</div>
          <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>★ {student.rating}</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.3 }}>{student.skill}</div>

        {student.bio && (
          <div className="tc-bio" style={{ fontSize: 11, color: 'rgba(245,239,227,.45)', lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {student.bio}
          </div>
        )}

        {student.tags && student.tags.length > 0 && (
          <div className="tc-tags" style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
            {student.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ fontSize: 10, padding: '3px 7px', borderRadius: 100, background: 'rgba(245,239,227,.04)', color: 'rgba(245,239,227,.45)', border: '1px solid rgba(245,239,227,.07)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)', gap: 6 }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 1, color: 'var(--cream)', lineHeight: 1 }}>
              from {student.starting_price}
              <small style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 10, fontWeight: 400, color: 'var(--muted)', display: 'block' }}>/ {student.price_unit}</small>
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>Tap to view profile</div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onBook() }}
            style={{
              background: 'transparent', color: 'var(--orange)',
              border: '1.5px solid rgba(255,75,31,.4)',
              padding: '9px 12px', borderRadius: 7,
              fontSize: 11, fontWeight: 700,
              cursor: 'pointer', minHeight: 36, whiteSpace: 'nowrap',
              transition: 'all .2s', flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--orange)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
            aria-label={`Book ${student.name}`}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}
